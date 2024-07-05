import { db } from "@/libs/kysely";
import { unstable_cache } from "next/cache";

export async function getAdminCompetitionsTableData() {
  return await db
    .selectFrom("competitions as c")
    .leftJoin("matches as m", "c.id", "m.competition_id")
    .select((eb) => [
      "c.id as competition_id",
      "c.full_name",
      "c.name_code",
      "c.logo_url",
      "c.primary_color",
      "c.secondary_color",
      eb
        .cast<number>(eb.fn.count("m.id").distinct(), "integer")
        .as("matches_count"),
    ])
    .groupBy(["c.id"])
    .execute();
}
