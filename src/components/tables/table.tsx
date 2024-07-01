"use client";

import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableProps = {
  data: RowData[];
  columns: ColumnDef<any, any>[];
  initialSort?: {
    id: string;
    desc: boolean;
  };
};

export function Table({ data, columns, initialSort }: TableProps) {
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    initialState: {
      sorting: initialSort ? [initialSort] : undefined,
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
