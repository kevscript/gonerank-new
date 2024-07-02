"use client";

import { VALID_SOURCE_PARAMS } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FILTER_SOURCE_KEY = "source" as const;

export function SourceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSourceFilter(newSource: (typeof VALID_SOURCE_PARAMS)[number]) {
    const newParams = new URLSearchParams(searchParams.toString());
    let sourceParam = newParams.get(FILTER_SOURCE_KEY);

    if (sourceParam !== newSource) {
      newParams.set(FILTER_SOURCE_KEY, newSource);
    }

    router.push(`${pathname}?${newParams}`);
  }

  return (
    <div className="flex">
      <div className="flex">
        <input
          type="checkbox"
          id="source-community"
          className="peer hidden"
          onChange={() => handleSourceFilter("community")}
          checked={
            searchParams.getAll(FILTER_SOURCE_KEY).includes("community") ||
            searchParams.getAll(FILTER_SOURCE_KEY).length === 0
          }
        />
        <label
          htmlFor="source-community"
          className="select-none cursor-pointer border h-10 flex items-center font-medium text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-neutral-50 peer-checked:text-gray-900 peer-checked:border-gray-200 rounded-l border-r-0 px-2"
        >
          {" "}
          Community{" "}
        </label>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          id="source-user"
          className="peer hidden"
          onChange={() => handleSourceFilter("user")}
          checked={searchParams.getAll(FILTER_SOURCE_KEY).includes("user")}
        />
        <label
          htmlFor="source-user"
          className="select-none cursor-pointer border h-10 flex items-center font-medium text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-neutral-50 peer-checked:text-gray-900 peer-checked:border-gray-200 rounded-r px-2"
        >
          {" "}
          You{" "}
        </label>
      </div>
    </div>
  );
}
