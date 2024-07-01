import { getAllCompetitions } from "@/db/queries/competitions";
import { getPublishedSeasons } from "@/db/queries/seasons";

export async function validateCompetitionParam(param: string) {
  const competitions = await getAllCompetitions();
  const competitionExists = competitions.find(
    (competition) =>
      competition.name_code.trim().toLowerCase() === param.trim().toLowerCase()
  );
  return competitionExists ? true : false;
}

export async function validateSeasonParam(param: string) {
  // has valid regex
  const regex = /^(\d{2})\/(\d{2})$/;
  const match = param.match(regex);
  if (!match) {
    return false;
  }

  // jjas valid sequence of years
  const firstNumber = parseInt(match[1], 10);
  const secondNumber = parseInt(match[2], 10);
  if (secondNumber !== firstNumber + 1) {
    return false;
  }

  const publishedSeasons = await getPublishedSeasons();
  const seasonExists = publishedSeasons.find(
    (season) => season.period === param
  );
  return seasonExists ? true : false;
}
