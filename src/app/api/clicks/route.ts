import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

const linkIds = new Set(links.map((link) => link.id));

// 모든 링크의 클릭 수를 { [linkId]: count } 형태로 한 번에 돌려준다.
export async function GET() {
  try {
    const collection = await getClicksCollection();
    const docs = await collection.find({}).toArray();
    const counts: Record<string, number> = Object.fromEntries(
      links.map((link) => [link.id, 0]),
    );
    for (const doc of docs) {
      if (linkIds.has(doc._id)) counts[doc._id] = doc.count;
    }
    return NextResponse.json(counts);
  } catch (error) {
    console.error("클릭 수 조회 실패", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 해당 링크의 클릭 수를 1 늘리고 새 값을 돌려준다.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = body?.id;
  if (typeof id !== "string" || !linkIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const collection = await getClicksCollection();
    const doc = await collection.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 증가 실패", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
