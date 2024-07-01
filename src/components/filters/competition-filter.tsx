"use client";

import { Competition } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const COMPETITION_FILTER_KEY = "competition" as const;

export function CompetitionFilter({
  competitions,
}: {
  competitions: Competition[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSeasonFilter(newCompetitionCode: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    let competitionParam = newParams.get(COMPETITION_FILTER_KEY);

    if (newCompetitionCode === "all") {
      newParams.delete(COMPETITION_FILTER_KEY);
    } else {
      if (competitionParam !== newCompetitionCode) {
        newParams.set(COMPETITION_FILTER_KEY, newCompetitionCode);
      }
    }
    router.push(`${pathname}?${newParams}`);
  }

  return (
    <div>
      <select
        name="competition"
        id="competition"
        value={searchParams.get("competition") || "all"}
        onChange={(e) => handleSeasonFilter(e.target.value)}
        className="h-10 px-2 border rounded bg-transparent"
      >
        <option value="all">All Competitions</option>
        {competitions.map((competition) => (
          <option key={competition.id} value={competition.name_code}>
            {competition.full_name}
          </option>
        ))}
      </select>
    </div>
  );
}
