import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export async function getPlayerInfos({ playerId }: { playerId: string }) {
  return await db
    .selectFrom("players as p")
    .selectAll()
    .where("p.id", "=", playerId)
    .executeTakeFirst();
}
