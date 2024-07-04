type BadgColor = "white" | "blue" | "red";

export function Badge({
  children,
  color = "white",
}: {
  children: React.ReactNode;
  color?: BadgColor;
}) {
  let styling = {
    white: "bg-gray-50 text-gray-600 ring-gray-500/10",
    blue: "bg-blue-50 text-blue-700 ring-blue-700/10",
    red: " bg-red-50 text-red-700 ring-red-600/10",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styling[color]}`}
    >
      {children}
    </span>
  );
}
