import { db } from "@/libs/kysely";

export async function getLatestDisplayableSeason() {
  const seasons = await db
    .selectFrom("seasons")
    .selectAll()
    .where("seasons.published", "=", true)
    .orderBy("seasons.end_date desc")
    .execute();

  const activeSeason = seasons.find((season) => season.active === true);

  if (!activeSeason) {
    const latestSeason = seasons[0];
    return latestSeason;
  }

  return activeSeason;
}
