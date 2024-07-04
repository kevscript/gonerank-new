import { getPlayerInfos } from "@/db/queries/players";
import { BreadCrumbs } from "./bread-crumbs";
import { getMatchInfos } from "@/db/queries/matches";

export async function MatchBreadCrumbs({ matchId }: { matchId: string }) {
  const matchInfos = await getMatchInfos({ matchId });

  if (!matchInfos) {
    return null;
  }

  const matchLabel = `${matchInfos.opponent_full_name}`;

  return (
    <BreadCrumbs
      crumbs={[
        { label: "Matches", href: "/matches" },
        { label: matchLabel, href: `/players/${matchId}` },
      ]}
    />
  );
}
