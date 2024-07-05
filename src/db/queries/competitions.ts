import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export const getAllCompetitions = unstable_cache(
  async () => {
    return await db.selectFrom("competitions").selectAll().execute();
  },
  ["public-competitions"],
  { tags: ["public"], revalidate: 300 }
);
