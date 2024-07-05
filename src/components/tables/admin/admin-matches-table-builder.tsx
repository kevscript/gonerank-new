"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { AdminMatchesTableData } from "./admin-matches-table";
import { TableCell } from "../table-cell";
import {
  Home,
  MapPin,
  Pen,
  Plane,
  Shirt,
  Swords,
  Trash,
  Trophy,
} from "lucide-react";
import { Table } from "../table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper<AdminMatchesTableData>();

export function AdminMatchesTableBuilder({
  data,
}: {
  data: AdminMatchesTableData[];
}) {
  const columns = [
    columnHelper.accessor("season_period", {
      id: "season-period",
      header: () => (
        <TableCell align="center" minRem={3}>
          <span>Season</span>
        </TableCell>
      ),
      cell: (data) => (
        <div className="relative w-full h-full flex justify-center items-center px-4">
          <span className="shrink-0">{data.getValue()}</span>
        </div>
      ),
      maxSize: 60,
    }),
    columnHelper.accessor("start_date", {
      id: "start-date",
      header: () => (
        <TableCell align="center" minRem={6}>
          <span>Date</span>
        </TableCell>
      ),
      cell: (data) => (
        <div className="relative w-full h-full flex justify-center items-center px-4">
          <span className="shrink-0">
            {new Date(data.getValue()).toLocaleDateString("fr")}
          </span>
        </div>
      ),
      maxSize: 100,
    }),
    columnHelper.accessor("opponent_full_name", {
      id: "opponent",
      header: () => {
        return (
          <div className="h-full flex items-center px2 md:px-4 min-w-12 justify-center md:justify-start md:min-w-32 lg:min-w-64">
            <span>Opponent</span>
          </div>
        );
      },
      cell: (data) => {
        const row = data.row.original;
        return (
          <div className="h-full flex items-center justify-center md:justify-start px-2 md:px-4 min-w-12 md:min-w-32 lg:min-w-64">
            <div className="flex gap-4 items-center shrink-0 flex-nowrap">
              <div className="size-8 shrink-0 rounded-full bg-neutral-200"></div>
              <span className="hidden lg:block">{row.opponent_full_name}</span>
              <span className="hidden md:block lg:hidden">
                {row.opponent_name_code}
              </span>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("location", {
      id: "location",
      header: () => {
        return (
          <TableCell minRem={4}>
            <MapPin className="size-4" />
          </TableCell>
        );
      },
      cell: (data) => (
        <TableCell minRem={4}>
          {data.getValue() === "AWAY" ? (
            <Plane className="size-4" />
          ) : (
            <Home className="size-4" />
          )}
        </TableCell>
      ),
    }),
    columnHelper.accessor("competition_name_code", {
      id: "competition",
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
              {numResult === 1 ? (
                <Badge color="blue">Win</Badge>
              ) : numResult === -1 ? (
                <Badge color="red">Lose</Badge>
              ) : (
                <Badge>Draw</Badge>
              )}
            </TableCell>
          );
        },
      }
    ),
    columnHelper.accessor("published", {
      id: "published",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Published</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          {data.getValue() === true ? (
            <Badge color="blue">Published</Badge>
          ) : (
            <Badge color="red">Private</Badge>
          )}
        </TableCell>
      ),
      maxSize: 100,
    }),
    columnHelper.accessor("active", {
      id: "active",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Active</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          {data.getValue() === true ? (
            <Badge color="blue">Active</Badge>
          ) : (
            <Badge color="red">Inactive</Badge>
          )}
        </TableCell>
      ),
      maxSize: 100,
    }),
    columnHelper.accessor(
      (row) => {
        return row.match_id;
      },
      {
        id: "squad",
        header: () => (
          <TableCell align="center" minRem={4}>
            <span>Squad</span>
          </TableCell>
        ),
        cell: (data) => {
          const playersCount = data.row.original.match_players_count;
          return (
            <Link href={`/admin/matches/${data.getValue()}/players`}>
              <TableCell align="center" minRem={4}>
                {playersCount >= 11 ? (
                  <Badge color="blue">{playersCount}</Badge>
                ) : (
                  <Badge color="red">{playersCount}</Badge>
                )}
              </TableCell>
            </Link>
          );
        },
        maxSize: 100,
      }
    ),
    columnHelper.accessor((row) => row.match_id, {
      id: "edit",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Edit</span>
        </TableCell>
      ),
      cell: (data) => (
        <Link href={`/admin/matches/${data.getValue()}`}>
          <TableCell align="center" minRem={4}>
            <Pen className="size-4" />
          </TableCell>
        </Link>
      ),
      maxSize: 100,
    }),
    columnHelper.accessor((row) => row.match_id, {
      id: "delete",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Delete</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          <Trash className="size-4" />
        </TableCell>
      ),
      maxSize: 100,
    }),
  ];

  return (
    <Table
      data={data}
      columns={columns}
      initialSort={{ id: "start-date", desc: true }}
    />
  );
}
