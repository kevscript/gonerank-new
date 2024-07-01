import Link from "next/link";

type TableCellProps = {
  children: React.ReactNode;
  minRem?: number;
  align?: "left" | "center" | "right";
  href?: string;
};

export function TableCell({
  children,
  minRem = 4,
  align = "center",
  href,
}: TableCellProps) {
  const alignClass =
    align === "right"
      ? "justify-end"
      : align === "left"
      ? "justify-start"
      : "justify-center";

  if (href) {
    return (
      <Link href={href}>
        <div
          className={`h-full flex items-center px-4 ${alignClass}`}
          style={{ minWidth: `${minRem}rem` }}
        >
          {children}
        </div>
      </Link>
    );
  }

  return (
    <div
      className={`h-full flex items-center px-4 ${alignClass}`}
      style={{ minWidth: `${minRem}rem` }}
    >
      {children}
    </div>
  );
}
