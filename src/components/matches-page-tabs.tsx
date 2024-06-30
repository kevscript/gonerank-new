"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function MatchesPageTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {}, []);

  function handleTab(newTab: string) {
    const tabParam = searchParams.get("tab");

    if (tabParam !== newTab) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("tab", newTab);

      router.push(`${pathname}?${newParams}`);
    }
  }

  return (
    <ul className="flex gap-4">
      <li
        onClick={() => handleTab("table")}
        className={`border-b cursor-pointer py-4 px-2 flex justify-center items-center hover:text-black ${
          searchParams.get("tab")?.trim().toLowerCase() !== "chart"
            ? "border-black text-black"
            : "border-transparent text-neutral-500"
        }`}
      >
        Table
      </li>
      <li
        onClick={() => handleTab("chart")}
        className={`border-b cursor-pointer py-4 px-2 flex justify-center items-center hover:text-black ${
          searchParams.get("tab")?.trim().toLowerCase() === "chart"
            ? "border-black text-black"
            : "border-transparent text-neutral-500"
        }`}
      >
        Chart
      </li>
    </ul>
  );
}
