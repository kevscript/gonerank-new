"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { MatchesTableData } from "./matches-table";
import { TableCell } from "@/components/tables/table-cell";
import { Table } from "../table";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const columnHelper = createColumnHelper<MatchesTableData>();

export function MatchesTableBuilder({
  data,
  isUser = false,
}: {
  data: MatchesTableData[];
  isUser: boolean;
}) {
  const searchParams = useSearchParams();
  const matchHref = useCallback(
    (matchId: string) => `/matches/${matchId}?${searchParams.toString()}`,
    [searchParams]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("start_date", {
        id: "start_date",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>Date</span>
            </TableCell>
          );
        },
        cell: (data) => {
          return (
            <TableCell minRem={4}>
              <span suppressHydrationWarning>
                {new Date(data.getValue() as Date).toLocaleDateString("fr", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </span>
            </TableCell>
          );
        },
      }),
      columnHelper.accessor("opponent.full_name", {
        header: () => {
          return (
            <div className="h-full flex items-center px2 md:px-4 min-w-12 justify-center md:justify-start md:min-w-32 lg:min-w-64">
              <span>Opponent</span>
            </div>
          );
        },
        cell: (data) => {
          const opponent = data.row.original.opponent;
          return (
            <Link href={matchHref(data.row.original.match_id)}>
              <div className="h-full flex items-center group justify-center md:justify-start px-2 md:px-4 min-w-12 md:min-w-32 lg:min-w-64">
                <div className="flex gap-4 items-center shrink-0 flex-nowrap">
                  <div className="size-8 shrink-0 rounded-full bg-neutral-200"></div>
                  <span className="hidden lg:block group-hover:underline underline-offset-4">
                    {opponent?.full_name}
                  </span>
                  <span className="hidden md:block lg:hidden group-hover:underline underline-offset-4">
                    {opponent?.name_code}
                  </span>
                </div>
              </div>
            </Link>
          );
        },
      }),
      columnHelper.accessor("location", {
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>Location</span>
            </TableCell>
          );
        },
        cell: (data) => (
          <TableCell minRem={4}>
            <span>{data.getValue()}</span>
          </TableCell>
        ),
      }),
      columnHelper.accessor("competition.name_code", {
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>Comp</span>
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
          const result = row.result;
          return result === "WIN" ? 1 : result === "LOSE" ? -1 : 0;
        },
        {
          id: "result",
          header: () => {
            return (
              <TableCell minRem={3}>
                <span>Result</span>
              </TableCell>
            );
          },
          cell: (data) => {
            const numResult = data.getValue();
            return (
              <TableCell minRem={3}>
                <span>
                  {numResult === 1 ? "W" : numResult === -1 ? "L" : "D"}
                </span>
              </TableCell>
            );
          },
        }
      ),
      columnHelper.accessor(
        (row) => {
          const positiveDiff = row.players.reduce((acc, player) => {
            return acc + player.diff_positive;
          }, 0);
          return positiveDiff;
        },
        {
          id: "positive-diff",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>+DIFF</span>
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
          const negativeDiff = row.players.reduce((acc, player) => {
            return acc + player.diff_negative;
          }, 0);
          return negativeDiff;
        },
        {
          id: "negative-diff",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>-DIFF</span>
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
          const diff = row.players.reduce((acc, player) => {
            return (
              acc + (player.diff_positive - Math.abs(player.diff_negative))
            );
          }, 0);
          return diff;
        },
        {
          id: "diff",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>DIFF</span>
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
          let worstAvg = Infinity;
          row.players.forEach((player) => {
            const playerAvg = player.total_rating / player.vote_count;
            if (playerAvg < worstAvg) {
              worstAvg = playerAvg;
            }
          });
          return isUser ? worstAvg : worstAvg.toFixed(2);
        },
        {
          id: "worst-avg",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>{isUser ? "-Rating" : "-AVG"}</span>
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
          let bestAvg = -Infinity;
          row.players.forEach((player) => {
            const playerAvg = player.total_rating / player.vote_count;
            if (playerAvg > bestAvg) {
              bestAvg = playerAvg;
            }
          });
          return isUser ? bestAvg : bestAvg.toFixed(2);
        },
        {
          id: "best-avg",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>{isUser ? "Rating" : "+AVG"}</span>
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
          const sumOfMatchAvgs = row.players.reduce((acc, player) => {
            return acc + player.total_rating / player.vote_count;
          }, 0);
          return (sumOfMatchAvgs / row.players.length).toFixed(2);
        },
        {
          id: "avg",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>AVG</span>
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
    [matchHref, isUser]
  );

  return (
    <Table
      data={data}
      columns={columns}
      initialSort={{ id: "start_date", desc: true }}
    />
  );
}
