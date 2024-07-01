import { getPublishedSeasons } from "@/db/queries/seasons";

export async function paramToSeason(seasonParam?: string) {
  const publishedSeasons = await getPublishedSeasons();

  let season = null;

  const seasonExists = seasonParam
    ? publishedSeasons.find((season) => season.period === seasonParam)
    : undefined;

  // no season in search params or does not exist
  if (!seasonParam || !seasonExists) {
    const activeSeason = publishedSeasons.find((season) => season.active);
    if (!activeSeason) {
      season = publishedSeasons[0];
    } else {
      season = activeSeason;
    }
  } else {
    season = seasonExists;
  }

  return season;
}
