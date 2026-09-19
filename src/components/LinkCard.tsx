import type { LinkItem } from "@/types/link";

export default function LinkCard({
  link,
  count,
  onOpen,
}: {
  link: LinkItem;
  count: number;
  onOpen: () => void;
}) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onOpen}
      // 가운데 버튼(휠) 클릭은 onClick이 발생하지 않아 따로 처리한다.
      onAuxClick={(e) => {
        if (e.button === 1) onOpen();
      }}
      className="relative col-span-3 grid grid-cols-subgrid rounded-2xl border border-white/70 bg-white/40 py-4 text-left text-[15px] font-medium text-stone-800 shadow-[0_8px_28px_-10px_rgba(190,110,50,0.25)] backdrop-blur-xl transition duration-200 hover:bg-white/60 hover:shadow-[0_12px_32px_-10px_rgba(190,110,50,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 active:bg-white/50 motion-reduce:transition-none"
    >
      <span className="col-start-2">{link.title}</span>
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-normal tabular-nums text-stone-500">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
