import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export const getAllCompetitions = unstable_cache(async () => {
  return db.selectFrom("competitions").selectAll().execute();
}, ["competitions"]);
