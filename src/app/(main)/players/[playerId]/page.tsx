import { FilterGroup } from "@/components/filters/filter-group";
import { PlayerTable } from "@/components/tables/player/player-table";
import { filterParamsSchema } from "@/schemas";
import { Filters } from "@/types/filters";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlayerPage({
  params,
}: {
  params: { playerId: string };
}) {
  const headerList = headers();
  const headerSearchParams = headerList.get("x-current-search-params");
  const searchParams = new URLSearchParams(headerSearchParams || "");

  const activeTab =
    searchParams.get("tab")?.trim().toLowerCase() === "chart"
      ? "chart"
      : "table";

  const validateFilterParams = await filterParamsSchema.safeParseAsync({
    source: searchParams?.get("source") || undefined,
    location: searchParams?.getAll("location") || undefined,
    result: searchParams.getAll("result") || undefined,
    season: searchParams.get("season") || undefined,
    competition: searchParams.get("competition") || undefined,
  });

  if (!validateFilterParams.success) {
    const errors = validateFilterParams.error.format();
    errors.season && searchParams.delete("season");
    errors.competition && searchParams.delete("competition");
    errors.location && searchParams.delete("location");
    errors.result && searchParams.delete("result");
    errors.source && searchParams.delete("source");
    redirect(`/players/${params.playerId}/${searchParams}`);
  }

  const filters: Filters = {
    source: searchParams?.get("source") || undefined,
    location: searchParams?.getAll("location") || undefined,
    result: searchParams.getAll("result") || undefined,
    season: searchParams.get("season") || undefined,
    competition: searchParams.get("competition") || undefined,
  };

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <div className="flex items-center gap-8">
        <div className="size-24 rounded-full bg-neutral-200 shrink-0"></div>
        <div className="flex justify-between gap-8 items-baseline w-full relative pb-4">
          <h1 className="font-bold text-3xl tracking-tight">Player</h1>
          <div className="absolute left-0 right-0 bottom-0 h-[1px] w-full bg-neutral-200 -z-10"></div>
        </div>
      </div>

      <div className="my-8">
        <FilterGroup />
      </div>

      <PlayerTable filters={filters} playerId={params.playerId} />
    </div>
  );
}
