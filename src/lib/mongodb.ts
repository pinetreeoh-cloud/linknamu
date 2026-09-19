import { MongoClient } from "mongodb";

export type ClickDoc = { _id: string; count: number };

// 개발 모드의 핫 리로드와 서버리스 환경에서 연결이 계속 늘어나지 않도록 전역에 캐시한다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다.");
  }
  if (!globalForMongo._mongoClientPromise) {
    const promise = new MongoClient(uri).connect();
    // 연결 실패가 캐시에 남아 영영 재시도하지 못하는 일을 막는다.
    promise.catch(() => {
      globalForMongo._mongoClientPromise = undefined;
    });
    globalForMongo._mongoClientPromise = promise;
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection() {
  const client = await getClient();
  return client.db().collection<ClickDoc>("clicks");
}
