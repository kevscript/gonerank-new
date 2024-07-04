import { getMatchInfos } from "@/db/queries/matches";
import { Badge } from "./ui/badge";
import { Home, Plane } from "lucide-react";

export async function MatchHeader({ matchId }: { matchId: string }) {
  const matchInfo = await getMatchInfos({ matchId });

  const matchScores = matchInfo?.scores as {
    scored_full: number;
    scored_pens: number | null;
    conceeded_full: number;
    conceeded_pens: number | null;
  };

  if (!matchInfo) {
    return null;
  }

  return (
    <div className="flex justify-between gap-8 items-baseline w-full relative pb-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Badge>{matchInfo.season_period}</Badge>
          <Badge>{new Date(matchInfo?.start_date).toLocaleDateString()}</Badge>
          <Badge>{matchInfo.competition_full_name}</Badge>
          <Badge>
            {matchInfo.location === "HOME" ? (
              <Home className="size-4" />
            ) : (
              <Plane className="size-4" />
            )}
          </Badge>
        </div>
        <div>
          <div className="flex items-baseline gap-4">
            <Badge
              color={
                matchInfo.result === "WIN"
                  ? "blue"
                  : matchInfo.result === "LOSE"
                  ? "red"
                  : "white"
              }
            >
              <span className="font-bold text-3xl tracking-tight">
                {matchScores.scored_full} : {matchScores.conceeded_full}
              </span>
            </Badge>
            <h1 className="font-bold text-3xl tracking-tight">
              {matchInfo?.opponent_full_name}
            </h1>
          </div>
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-[1px] w-full bg-neutral-200 -z-10"></div>
    </div>
  );
}
