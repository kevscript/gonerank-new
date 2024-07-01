import { SourceFilter } from "@/components/filters/source-filter";
import { MatchTable } from "@/components/tables/match/match-table";
import { filterParamsSchema } from "@/schemas";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MatchPage({
  params,
}: {
  params: { matchId: string };
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
    redirect(`/matches/${params.matchId}/${searchParams}`);
  }

  const filters = {
    source: searchParams?.get("source") || undefined,
  };

  return (
    <main className="p-12">
      <div className="flex justify-between gap-8 items-baseline w-full relative pb-4">
        <h1 className="font-bold text-3xl tracking-tight">Match</h1>
        <div className="absolute left-0 right-0 bottom-0 h-[1px] w-full bg-neutral-200 -z-10"></div>
      </div>

      <div className="my-8">
        <SourceFilter />
      </div>

      <MatchTable matchId={params.matchId} filters={filters} />
    </main>
  );
}
