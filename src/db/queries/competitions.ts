import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export const getAllCompetitions = unstable_cache(async () => {
  try {
    const competitions = await db
      .selectFrom("competitions")
      .selectAll()
      .execute();
    return competitions;
  } catch (err: any) {
    throw new Error(err);
  }
}, ["competitions"]);
