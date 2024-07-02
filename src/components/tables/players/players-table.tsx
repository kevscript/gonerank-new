import { TEST_AUTH_USER_ID } from "@/constants";
import { getPlayersTableData } from "@/db/queries/get-players-table-data";
import { Filters } from "@/types/filters";
import { paramToSeason } from "@/utils/param-parsers";
import { PlayersTableBuilder } from "./players-table-builder";

export type PlayersTableData = Awaited<
  ReturnType<typeof getPlayersTableData>
>[0];

type PlayersTableProps = {
  filters: Filters;
};

export async function PlayersTable({ filters }: PlayersTableProps) {
  const userId = TEST_AUTH_USER_ID;
  const activeSeason = await paramToSeason(filters.season);

  const playersTableData = await getPlayersTableData({
    seasonId: activeSeason.id,
    userId: filters.source === "user" ? userId : undefined,
  });

  // let formatedMatchesTableData = [...matchesTableData].filter((match) => {
  //   const hasCompetition =
  //     !filters.competition ||
  //     match.competition?.name_code.trim().toLowerCase() ===
  //       filters.competition.trim().toLowerCase();
  //   const hasLocation =
  //     !filters.location ||
  //     filters.location.length === 0 ||
  //     filters.location.includes(match.location.toLowerCase());
  //   const hasResult =
  //     !filters.result ||
  //     filters.result.length === 0 ||
  //     filters.result.includes(match.result.toLowerCase());

  //   return hasCompetition && hasLocation && hasResult;
  // });

  // if (formatedMatchesTableData.length === 0) {
  //   return (
  //     <div className="flex w-full justify-center items-center h-16">
  //       <span>
  //         There is no matches corresponding to current filtering options. Try
  //         something else.
  //       </span>
  //     </div>
  //   );
  // }

  return <PlayersTableBuilder data={playersTableData} />;
}
