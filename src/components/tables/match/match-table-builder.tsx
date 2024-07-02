"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { MatchTableData } from "./match-table";
import { TableCell } from "@/components/tables/table-cell";
import { Table } from "../table";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

const columnHelper = createColumnHelper<MatchTableData>();

export function MatchTableBuilder({
  data,
  isUser = false,
}: {
  data: MatchTableData[];
  isUser?: boolean;
}) {
  const searchParams = useSearchParams();
  const playerHref = useCallback(
    (playerId: string) => `/players/${playerId}?${searchParams.toString()}`,
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
            <Link href={playerHref(player.player_id)}>
              <div className="h-full flex items-center group justify-center md:justify-start px-2 md:px-4 min-w-12 md:min-w-52 lg:min-w-64">
                <div className="flex gap-4 items-center shrink-0 flex-nowrap">
                  <div className="size-8 shrink-0 rounded-full bg-neutral-200"></div>
                  <span className="hidden lg:block group-hover:underline underline-offset-4">
                    {player.first_name + " " + player.last_name}
                  </span>
                  <span className="hidden md:block lg:hidden group-hover:underline underline-offset-4">
                    {player.first_name?.[0] + ". " + player.last_name}
                  </span>
                </div>
              </div>
            </Link>
          );
        },
      }),
      // columnHelper.accessor(
      //   (row) => {
      //     let highestMotm = 0;
      //     let highestBotm = 0;
      //     data.forEach((player) => {
      //       if (player.motm_count > highestMotm) {
      //         highestMotm = player.motm_count;
      //       }
      //       if (player.botm_count > highestBotm) {
      //         highestBotm = player.botm_count;
      //       }
      //     });

      //     const hasHighestMotm = highestMotm === row.motm_count;
      //     const hasHighestBotm = highestBotm === row.botm_count;
      //     return hasHighestBotm && hasHighestMotm
      //       ? 2
      //       : hasHighestBotm && !hasHighestMotm
      //       ? -1
      //       : !hasHighestBotm && hasHighestMotm
      //       ? 1
      //       : 0;
      //   },
      //   {
      //     id: "award",
      //     header: () => {
      //       return (
      //         <TableCell minRem={4}>
      //           <span>Award</span>
      //         </TableCell>
      //       );
      //     },
      //     cell: (data) => (
      //       <TableCell minRem={4}>
      //         <span>{data.getValue() || "-"}</span>
      //       </TableCell>
      //     ),
      //   }
      // ),
      columnHelper.accessor("motm_count", {
        id: "motm-count",
        header: () => {
          return (
            <TableCell minRem={4}>
              <ThumbsUp className="size-4" />
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
              <ThumbsDown className="size-4" />
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
            <span>{data.getValue() || "-"}</span>
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
            <span>{data.getValue() || "-"}</span>
          </TableCell>
        ),
      }),
      columnHelper.accessor(
        (row) => row.diff_positive - Math.abs(row.diff_negative),
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
      columnHelper.accessor(
        (row) => {
          return (row.total_rating / row.vote_count).toFixed(2);
        },
        {
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
      initialSort={{ id: "avg", desc: true }}
      columnVisibility={
        isUser
          ? {
              "negative-diff": false,
              "positive-diff": false,
              diff: false,
              "min-rating": false,
              "max-rating": false,
              // "motm-count": false,
              // "botm-count": false,
            }
          : undefined
      }
    />
  );
}
