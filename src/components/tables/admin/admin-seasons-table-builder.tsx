"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "../table-cell";
import { Pen, Trash } from "lucide-react";
import { Table } from "../table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AdminSeasonsTableData } from "./admin-seasons-table";

const columnHelper = createColumnHelper<AdminSeasonsTableData>();

export function AdminSeasonsTableBuilder({
  data,
}: {
  data: AdminSeasonsTableData[];
}) {
  const columns = [
    columnHelper.accessor("period", {
      id: "season-period",
      header: () => (
        <TableCell align="center" minRem={3}>
          <span>Period</span>
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
          <span>Start</span>
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
    columnHelper.accessor("end_date", {
      id: "end-date",
      header: () => (
        <TableCell align="center" minRem={6}>
          <span>End</span>
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
    columnHelper.accessor(
      (row) => {
        return row.season_id;
      },
      {
        id: "squad",
        header: () => (
          <TableCell align="center" minRem={4}>
            <span>Players</span>
          </TableCell>
        ),
        cell: (data) => {
          const playersCount = data.row.original.players_count;
          return (
            <Link href={`/admin/seasons/${data.getValue()}/players`}>
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
    columnHelper.accessor((row) => row.season_id, {
      id: "edit",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Edit</span>
        </TableCell>
      ),
      cell: (data) => (
        <Link href={`/admin/seasons/${data.getValue()}`}>
          <TableCell align="center" minRem={4}>
            <Pen className="size-4" />
          </TableCell>
        </Link>
      ),
      maxSize: 100,
    }),
    columnHelper.accessor((row) => row.season_id, {
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
      initialSort={{ id: "end-date", desc: true }}
    />
  );
}
