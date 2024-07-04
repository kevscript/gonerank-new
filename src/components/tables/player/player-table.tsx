import { TEST_AUTH_USER_ID } from "@/constants";
import { Filters } from "@/types/filters";
import { paramToSeason } from "@/utils/param-parsers";
import { getPlayerTableData } from "@/db/queries/get-player-table-data";
import { PlayerTableBuilder } from "./player-table-builder";

export type PlayerTableData = Awaited<ReturnType<typeof getPlayerTableData>>[0];

type PlayerTableProps = {
  filters: Filters;
  playerId: string;
};

export async function PlayerTable({ filters, playerId }: PlayerTableProps) {
  const userId = TEST_AUTH_USER_ID;
  const activeSeason = await paramToSeason(filters.season);

  const playerTableData = await getPlayerTableData({
    seasonId: activeSeason.id,
    playerId: playerId,
    userId: filters.source === "user" ? userId : undefined,
  });

  const formatedPlayerTableData = playerTableData.filter((match) => {
    const hasCompetition =
      !filters.competition ||
      match.competition?.name_code?.trim().toLowerCase() ===
        filters.competition.trim().toLowerCase();
    const hasLocation =
      !filters.location ||
      filters.location.length === 0 ||
      filters.location.includes(match.location.toLowerCase());
    const hasResult =
      !filters.result ||
      filters.result.length === 0 ||
      filters.result.includes(match.result.toLowerCase());

    return hasCompetition && hasLocation && hasResult;
  });

  if (formatedPlayerTableData.length === 0) {
    return (
      <div className="flex w-full justify-center items-center min-h-16 border rounded p-4">
        <span>
          Seems like no matches are corresponding to current options. Try
          something else.
        </span>
      </div>
    );
  }

  return (
    <PlayerTableBuilder
      data={formatedPlayerTableData}
      isUser={filters.source === "user"}
    />
  );
}
