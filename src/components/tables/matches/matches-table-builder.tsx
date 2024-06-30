"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { MatchesTableItem } from "./matches-table";
import { TableCell } from "@/components/table-cell";

const columnHelper = createColumnHelper<MatchesTableItem>();

export function MatchesTableBuilder({ data }: { data: MatchesTableItem[] }) {
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
            <div className="h-full flex items-center justify-center md:justify-start px-2 md:px-4 min-w-12 md:min-w-32 lg:min-w-64">
              <div className="flex gap-4 items-center shrink-0 flex-nowrap">
                <div className="size-8 shrink-0 rounded-full bg-neutral-200"></div>
                <span className="hidden lg:block">{opponent?.full_name}</span>
                <span className="hidden md:block lg:hidden">
                  {opponent?.name_code}
                </span>
              </div>
            </div>
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
          return worstAvg.toFixed(2);
        },
        {
          id: "worst-avg",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>-AVG</span>
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
          return bestAvg.toFixed(2);
        },
        {
          id: "best-avg",
          header: () => {
            return (
              <TableCell minRem={4}>
                <span>+AVG</span>
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
    []
  );

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    initialState: {
      sorting: [{ id: "start_date", desc: true }],
    },
    sortingFns: {
      numericalSort: (rowA, rowB, columnId) => {
        let a = Number.parseFloat(rowA.getValue(columnId));
        let b = Number.parseFloat(rowB.getValue(columnId));
        if (Number.isNaN(a)) {
          // Blanks and non-numeric strings to bottom
          a = Number.NEGATIVE_INFINITY;
        }
        if (Number.isNaN(b)) {
          b = Number.NEGATIVE_INFINITY;
        }
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      },
    },
  });

  return (
    <div className="w-full overflow-x-auto border rounded">
      <table className="w-full overflow-hidden">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="h-12 border-r last:border-none overflow-hidden text-xs font-medium text-left"
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b last:border-none">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="h-12 border-r last:border-none text-sm"
                  style={{ width: cell.column.getSize(), minWidth: "content" }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
