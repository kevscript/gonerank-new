"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "@/components/tables/table-cell";
import { Table } from "../table";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PlayersTableData } from "./players-table";

const columnHelper = createColumnHelper<PlayersTableData>();

export function PlayersTableBuilder({ data }: { data: PlayersTableData[] }) {
  const searchParams = useSearchParams();
  const isUser = searchParams.get("source") === "user";
  const playerHref = useCallback(
    (playerId: string) => `/player/${playerId}?${searchParams.toString()}`,
    [searchParams]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("last_name", {
        id: "last-name",
        header: () => {
          return (
            <TableCell minRem={4} align="left">
              <span>Player</span>
            </TableCell>
          );
        },
        cell: (data) => {
          const player = data.row.original;
          return (
            <Link href={playerHref(data.row.original.player_id)}>
              <div className="h-full flex items-center justify-center md:justify-start px-2 md:px-4 min-w-12 md:min-w-52 lg:min-w-64">
                <div className="flex gap-4 items-center shrink-0 flex-nowrap">
                  <div className="size-8 shrink-0 rounded-full bg-neutral-200"></div>
                  <span className="hidden lg:block">
                    {player.first_name + " " + player.last_name}
                  </span>
                  <span className="hidden md:block lg:hidden">
                    {player.first_name?.[0] + ". " + player.last_name}
                  </span>
                </div>
              </div>
            </Link>
          );
        },
      }),
      columnHelper.accessor((row) => row.matches.length, {
        id: "matches-amount",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>Matches</span>
            </TableCell>
          );
        },
        cell: (data) => (
          <TableCell minRem={4}>
            <span>{data.getValue()}</span>
          </TableCell>
        ),
      }),
      columnHelper.accessor(
        (row) => {
          let seasonMinutes = 0;
          row.matches.forEach((match) => {
            seasonMinutes += match.minutes_played;
          });
          return seasonMinutes;
        },
        {
          id: "season-minutes",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>Minutes</span>
              </TableCell>
            );
          },
          cell: (data) => (
            <TableCell minRem={4}>
              <span>{data.getValue()}</span>
            </TableCell>
          ),
        }
      ),
      columnHelper.accessor(
        (row) => {
          let diffSum = 0;

          row.matches.forEach((match) => {
            diffSum += match.diff_positive;
          });

          return diffSum;
        },
        {
          id: "season-positive-diff",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>+Diff</span>
              </TableCell>
            );
          },
          cell: (data) => (
            <TableCell minRem={4}>
              <span>{data.getValue()}</span>
            </TableCell>
          ),
        }
      ),
      columnHelper.accessor(
        (row) => {
          let diffSum = 0;
          row.matches.forEach((match) => {
            diffSum += match.diff_negative;
          });

          return diffSum;
        },
        {
          id: "season-negative-diff",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>-Diff</span>
              </TableCell>
            );
          },
          cell: (data) => (
            <TableCell minRem={4}>
              <span>{data.getValue()}</span>
            </TableCell>
          ),
        }
      ),
      columnHelper.accessor(
        (row) => {
          let diffSum = 0;
          row.matches.forEach((match) => {
            diffSum += match.diff_positive + match.diff_negative;
          });

          return diffSum;
        },
        {
          id: "season-diff",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>Diff</span>
              </TableCell>
            );
          },
          cell: (data) => (
            <TableCell minRem={4}>
              <span>{data.getValue()}</span>
            </TableCell>
          ),
        }
      ),
      columnHelper.accessor(
        (row) => {
          let lowestAvg = 10;
          row.matches.forEach((match) => {
            if (match.avg_rating < lowestAvg) lowestAvg = match.avg_rating;
          });

          return isUser ? lowestAvg : lowestAvg.toFixed(2);
        },
        {
          id: "lowest-avg",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>Lowest AVG</span>
              </TableCell>
            );
          },
          cell: (data) => (
            <TableCell minRem={4}>
              <span>{data.getValue()}</span>
            </TableCell>
          ),
        }
      ),
      columnHelper.accessor(
        (row) => {
          let highestAvg = 0;
          row.matches.forEach((match) => {
            if (match.avg_rating > highestAvg) highestAvg = match.avg_rating;
          });

          return isUser ? highestAvg : highestAvg.toFixed(2);
        },
        {
          id: "highest-avg",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>Highest AVG</span>
              </TableCell>
            );
          },
          cell: (data) => (
            <TableCell minRem={4}>
              <span>{data.getValue()}</span>
            </TableCell>
          ),
        }
      ),
      columnHelper.accessor(
        (row) => {
          let avgSum = 0;
          let avgDivider = 0;

          row.matches.forEach((match) => {
            if (match.vote_count > 0) {
              const matchAvg = match.total_rating / match.vote_count;
              avgSum += matchAvg;
              avgDivider++;
            }
          });

          return (avgSum / avgDivider).toFixed(2);
        },
        {
          id: "season-avg",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>Avg</span>
              </TableCell>
            );
          },
          cell: (data) => (
            <TableCell minRem={4}>
              <span>{data.getValue()}</span>
            </TableCell>
          ),
        }
      ),
    ],
    [playerHref, isUser]
  );

  return (
    <Table
      data={data}
      columns={columns}
      initialSort={{ id: "season-avg", desc: true }}
    />
  );
}
