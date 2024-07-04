import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export const getPlayerInfos = unstable_cache(
  async ({ playerId }: { playerId: string }) => {
    try {
      const infos = await db
        .selectFrom("players as p")
        .selectAll()
        .where("p.id", "=", playerId)
        .executeTakeFirst();
      return infos;
    } catch (err: any) {
      console.log("getPlayerInfos ERROR", err);
      throw new Error(err);
    }
  }
);
