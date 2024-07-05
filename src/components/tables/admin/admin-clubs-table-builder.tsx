"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "../table-cell";
import { Pen, Trash } from "lucide-react";
import { Table } from "../table";
import Link from "next/link";
import { AdminClubsTableData } from "./admin-clubs-table";

const columnHelper = createColumnHelper<AdminClubsTableData>();

export function AdminClubsTableBuilder({
  data,
}: {
  data: AdminClubsTableData[];
}) {
  const columns = [
    columnHelper.accessor("logo_url", {
      id: "logo-url",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Logo</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          <div className="size-8 rounded-full bg-neutral-200"></div>
        </TableCell>
      ),
      maxSize: 60,
    }),
    columnHelper.accessor("full_name", {
      id: "full-name",
      header: () => (
        <TableCell align="left" minRem={10}>
          <span>Full Name</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="left" minRem={10}>
          <span className="shrink-0">{data.getValue()}</span>
        </TableCell>
      ),
    }),
    columnHelper.accessor("name_code", {
      id: "name-code",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Name Code</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          <span className="shrink-0">{data.getValue()}</span>
        </TableCell>
      ),
      maxSize: 80,
    }),
    columnHelper.accessor("primary_color", {
      id: "primary-color",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Primary</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          <span className="shrink-0">{data.getValue()}</span>
        </TableCell>
      ),
      maxSize: 80,
    }),
    columnHelper.accessor("secondary_color", {
      id: "secondary-color",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Secondary</span>
        </TableCell>
      ),
      cell: (data) => (
        <TableCell align="center" minRem={4}>
          <span className="shrink-0">{data.getValue()}</span>
        </TableCell>
      ),
      maxSize: 80,
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
          <span className="shrink-0">{data.getValue()}</span>
        </TableCell>
      ),
      maxSize: 80,
    }),
    columnHelper.accessor((row) => row.club_id, {
      id: "edit",
      header: () => (
        <TableCell align="center" minRem={4}>
          <span>Edit</span>
        </TableCell>
      ),
      cell: (data) => (
        <Link href={`/admin/competitions/${data.getValue()}`}>
          <TableCell align="center" minRem={4}>
            <Pen className="size-4" />
          </TableCell>
        </Link>
      ),
      maxSize: 80,
    }),
    columnHelper.accessor((row) => row.club_id, {
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
      maxSize: 80,
    }),
  ];

  return (
    <Table
      data={data}
      columns={columns}
      initialSort={{ id: "full-name", desc: false }}
    />
  );
}
