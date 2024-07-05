"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "../table-cell";
import { Pen, Trash } from "lucide-react";
import { Table } from "../table";
import Link from "next/link";
import { AdminCompetitionsTableData } from "./admin-competitions-table";

const columnHelper = createColumnHelper<AdminCompetitionsTableData>();

export function AdminCompetitionsTableBuilder({
  data,
}: {
  data: AdminCompetitionsTableData[];
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
    columnHelper.accessor((row) => row.competition_id, {
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
    columnHelper.accessor((row) => row.competition_id, {
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
