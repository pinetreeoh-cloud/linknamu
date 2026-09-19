"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/types/link";
import LinkCard from "@/components/LinkCard";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 비어 있고, 카드에는 0회로 표시된다.
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<Counts>) : null))
      .then((data) => {
        if (data) setCounts(data);
      })
      .catch(() => {
        // 실패하면 0회로 그대로 둔다. 언마운트로 인한 취소도 여기로 들어온다.
      });
    return () => controller.abort();
  }, []);

  const adjust = (id: string, delta: number) =>
    setCounts((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }));

  const recordClick = (id: string) => {
    adjust(id, 1);
    // 새 탭이 열려도 요청이 끊기지 않도록 keepalive를 켠다.
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    })
      .then((res) => (res.ok ? (res.json() as Promise<{ count: number }>) : Promise.reject()))
      .then(({ count }) =>
        // 응답이 순서 없이 도착해도 값이 줄어들지 않게 큰 쪽을 취한다.
        setCounts((prev) => ({ ...prev, [id]: Math.max(prev[id] ?? 0, count) })),
      )
      .catch(() => adjust(id, -1));
  };

  return (
    // 가운데 열의 폭을 모든 카드가 공유해, 제목 묶음은 카드 가운데에 두고 시작점은 서로 맞춘다.
    <ul className="grid w-full grid-cols-[1fr_auto_1fr] gap-y-4">
      {links.map((link) => (
        <li key={link.id} className="col-span-3 grid grid-cols-subgrid">
          <LinkCard
            link={link}
            count={counts[link.id] ?? 0}
            onOpen={() => recordClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
