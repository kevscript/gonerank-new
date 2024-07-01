"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { MatchTableData } from "./match-table";
import { TableCell } from "@/components/tables/table-cell";
import { Table } from "../table";
import { useMemo } from "react";

const columnHelper = createColumnHelper<MatchTableData>();

export function MatchTableBuilder({
  data,
  isUser = false,
}: {
  data: MatchTableData[];
  isUser?: boolean;
}) {
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
          );
        },
      }),
      columnHelper.accessor(
        (row) => {
          let highestMotm = 0;
          let highestBotm = 0;
          data.forEach((player) => {
            if (player.motm_count > highestMotm) {
              highestMotm = player.motm_count;
            }
            if (player.botm_count > highestBotm) {
              highestBotm = player.botm_count;
            }
          });

          const hasHighestMotm = highestMotm === row.motm_count;
          const hasHighestBotm = highestBotm === row.botm_count;
          return hasHighestBotm && hasHighestMotm
            ? 2
            : hasHighestBotm && !hasHighestMotm
            ? -1
            : !hasHighestBotm && hasHighestMotm
            ? 1
            : 0;
        },
        {
          id: "award",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>Award</span>
              </TableCell>
            );
          },
          cell: (data) => (
            <TableCell minRem={4}>
              <span>{data.getValue() || "-"}</span>
            </TableCell>
          ),
        }
      ),
      columnHelper.accessor("motm_count", {
        id: "motm-count",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>MOTM</span>
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
              <span>BOTM</span>
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
              <span>+DIFF</span>
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
              <span>-DIFF</span>
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
      columnHelper.accessor("max_rating", {
        id: "max-rating",
        header: () => {
          return (
            <TableCell minRem={4}>
              <span>+Rating</span>
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
              <span>-Rating</span>
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
    [data]
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
              "min-rating": false,
              "max-rating": false,
              "motm-count": false,
              "botm-count": false,
            }
          : undefined
      }
    />
  );
}
