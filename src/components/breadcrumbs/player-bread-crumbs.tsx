import { getPlayerInfos } from "@/db/queries/players";
import { BreadCrumbs } from "./bread-crumbs";

export async function PlayerBreadCrumbs({ playerId }: { playerId: string }) {
  const playerInfos = await getPlayerInfos({ playerId });

  if (!playerInfos) {
    return null;
  }

  const { first_name, last_name } = playerInfos;
  const playerName = first_name ? `${first_name} ${last_name}` : last_name;

  return (
    <BreadCrumbs
      crumbs={[
        { label: "Players", href: "/players" },
        { label: playerName, href: `/players/${playerId}` },
      ]}
    />
  );
}
