import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export const getPublishedSeasons = unstable_cache(async () => {
  return await db
    .selectFrom("seasons")
    .selectAll()
    .where("published", "=", true)
    .orderBy("end_date desc")
    .execute();
}, ["seasons"]);
