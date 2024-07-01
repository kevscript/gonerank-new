"use client";

import { Season } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SEASON_FILTER_KEY = "season" as const;

export function SeasonFilter({ seasons }: { seasons: Season[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSeasonFilter(newSeasonPeriod: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    let seasonParam = newParams.get(SEASON_FILTER_KEY);

    if (seasonParam !== newSeasonPeriod) {
      newParams.set(SEASON_FILTER_KEY, newSeasonPeriod);
    }

    router.push(`${pathname}?${newParams}`);
  }

  return (
    <div>
      <select
        name="season"
        id="season"
        value={
          searchParams.get("season") ||
          seasons.sort((a, b) => (a.end_date > b.end_date ? -1 : 1))[0].period
        }
        onChange={(e) => handleSeasonFilter(e.target.value)}
        className="h-10 px-2 bg-transparent border rounded"
      >
        {seasons.map((season) => (
          <option key={season.id} value={season.period}>
            {"Season " + season.period}
          </option>
        ))}
      </select>
    </div>
  );
}
