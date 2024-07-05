"use client";

import { createColumnHelper } from "@tanstack/react-table";
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
import { AdminPlayersTableData } from "./admin-players.table";

const columnHelper = createColumnHelper<AdminPlayersTableData>();

export function AdminPlayersTableBuilder({
  data,
}: {
  data: AdminPlayersTableData[];
}) {
  const columns = [
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
        );
      },
    }),
    columnHelper.accessor("birth_date", {
      id: "birth-date",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Birth Date</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          <span>{new Date(data.getValue()).toLocaleDateString("fr")}</span>
        </TableCell>
      ),
      maxSize: 100,
    }),
    columnHelper.accessor("country_code", {
      id: "country-code",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Country</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          <span>{data.getValue()}</span>
        </TableCell>
      ),
      maxSize: 100,
    }),
    columnHelper.accessor("matches_count", {
      id: "matches-count",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Matches</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          <span>{data.getValue()}</span>
        </TableCell>
      ),
      maxSize: 100,
    }),
    columnHelper.accessor("seasons_count", {
      id: "seasons-count",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Seasons</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          <span>{data.getValue()}</span>
        </TableCell>
      ),
      maxSize: 100,
    }),
    columnHelper.accessor((row) => row.player_id, {
      id: "edit",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Edit</span>
        </TableCell>
      ),
      cell: (data) => (
        <Link href={`/admin/players/${data.getValue()}`}>
          <TableCell align="center" minRem={4}>
            <Pen className="size-4" />
          </TableCell>
        </Link>
      ),
      maxSize: 100,
    }),
    columnHelper.accessor((row) => row.player_id, {
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
      initialSort={{ id: "last-name", desc: false }}
    />
  );
}
