type TableCellProps = {
  children: React.ReactNode;
  minRem?: number;
  align?: "left" | "center" | "right";
};

export function TableCell({
  children,
  minRem = 4,
  align = "center",
}: TableCellProps) {
  const alignClass =
    align === "right"
      ? "justify-end"
      : align === "left"
      ? "justify-start"
      : "justify-center";

  return (
    <div
      className={`h-full flex items-center px-4 ${alignClass}`}
      style={{ minWidth: `${minRem}rem` }}
    >
      {children}
    </div>
  );
}
