"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "@/components/tables/table-cell";
import { Table } from "../table";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Home,
  MapPin,
  Plane,
  Swords,
  Trophy,
} from "lucide-react";
import { PlayerTableData } from "./player-table";

const columnHelper = createColumnHelper<PlayerTableData>();

export function PlayerTableBuilder({
  data,
  isUser = false,
}: {
  data: PlayerTableData[];
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
              <Calendar className="size-4" />
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
              <MapPin className="size-4" />
            </TableCell>
          );
        },
        cell: (data) => {
          return (
            <TableCell minRem={4}>
              {data.getValue() === "AWAY" ? (
                <Plane className="size-4" />
              ) : (
                <Home className="size-4" />
              )}
            </TableCell>
          );
        },
      }),
      columnHelper.accessor("competition.name_code", {
        header: () => {
          return (
            <TableCell minRem={4}>
              <Trophy className="size-4" />
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
                <Swords className="size-4" />
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
      columnHelper.accessor("motm_count", {
        id: "motm-count",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>MotM</span>
            </TableCell>
          );
        },
        cell: (data) => (
          <TableCell minRem={4}>
            <span>{data.getValue()}</span>
          </TableCell>
        ),
      }),
      columnHelper.accessor("botm_count", {
        id: "botm-count",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>BotM</span>
            </TableCell>
          );
        },
        cell: (data) => (
          <TableCell minRem={4}>
            <span>{data.getValue()}</span>
          </TableCell>
        ),
      }),
      columnHelper.accessor("diff_positive", {
        id: "positive-diff",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>Diff</span>
              <ArrowUpRight className="size-4" />
            </TableCell>
          );
        },
        cell: (data) => (
          <TableCell minRem={4}>
            <span>{data.getValue()}</span>
          </TableCell>
        ),
      }),
      columnHelper.accessor("diff_negative", {
        id: "negative-diff",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>Diff</span>
              <ArrowDownRight className="size-4" />
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
          return row.diff_positive + row.diff_negative;
        },
        {
          id: "diff",
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
      columnHelper.accessor("max_rating", {
        id: "max-rating",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>Rating</span>
              <ArrowUpRight className="size-4" />
            </TableCell>
          );
        },
        cell: (data) => (
          <TableCell minRem={4}>
            <span>{data.getValue()}</span>
          </TableCell>
        ),
      }),
      columnHelper.accessor("min_rating", {
        id: "min-rating",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>Rating</span>
              <ArrowDownRight className="size-4" />
            </TableCell>
          );
        },
        cell: (data) => (
          <TableCell minRem={4}>
            <span>{data.getValue()}</span>
          </TableCell>
        ),
      }),
      columnHelper.accessor("avg_rating", {
        id: "avg",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>{isUser ? "Rating" : "Avg"}</span>
            </TableCell>
          );
        },
        cell: (data) => (
          <TableCell minRem={4}>
            <span>{isUser ? data.getValue() : data.getValue().toFixed(2)}</span>
          </TableCell>
        ),
      }),
    ],
    [matchHref, isUser]
  );

  return (
    <Table
      data={data}
      columns={columns}
      initialSort={{ id: "start_date", desc: true }}
      columnVisibility={
        isUser
          ? {
              "min-rating": false,
              "max-rating": false,
              diff: false,
              "positive-diff": false,
              "negative-diff": false,
            }
          : undefined
      }
    />
  );
}
