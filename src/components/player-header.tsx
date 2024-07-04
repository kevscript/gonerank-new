import { getPlayerInfos } from "@/db/queries/players";
import { User } from "lucide-react";

export async function PlayerHeader({ playerId }: { playerId: string }) {
  const playerInfos = await getPlayerInfos({ playerId });

  if (!playerId) {
    return null;
  }

  return (
    <div className="flex items-center gap-8">
      <div className="relative flex justify-center items-center size-24 rounded-full bg-neutral-200 shrink-0 overflow-hidden">
        <User className="w-full h-full translate-y-4" />
      </div>
      <div className="flex justify-between gap-8 items-baseline w-full relative pb-4">
        <h1 className="font-bold text-3xl tracking-tight">
          {playerInfos?.first_name + " " + playerInfos?.last_name}
        </h1>
        <div className="absolute left-0 right-0 bottom-0 h-[1px] w-full bg-neutral-200 -z-10"></div>
      </div>
    </div>
  );
}
