"use client";

import { VALID_RESULT_PARAMS } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FILTER_RESULT_KEY = "result" as const;

export function ResultFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleResultFilter(newResult: (typeof VALID_RESULT_PARAMS)[number]) {
    const newParams = new URLSearchParams(searchParams.toString());
    let resultParams = newParams.getAll(FILTER_RESULT_KEY);

    if (!resultParams.includes(newResult)) {
      newParams.append(FILTER_RESULT_KEY, newResult);
    } else {
      newParams.delete(FILTER_RESULT_KEY, newResult);
    }

    router.push(`${pathname}?${newParams}`);
  }

  return (
    <div className="flex">
      <div className="flex">
        <input
          type="checkbox"
          id="result-win"
          className="peer hidden"
          onChange={() => handleResultFilter("win")}
          checked={searchParams.getAll(FILTER_RESULT_KEY).includes("win")}
        />
        <label
          htmlFor="result-win"
          className="w-10 justify-center select-none cursor-pointer border h-10 flex items-center font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-neutral-50 peer-checked:text-blue-700 peer-checked:border-gray-200 rounded-l border-r-0"
        >
          {" "}
          W{" "}
        </label>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          id="result-draw"
          className="peer hidden"
          onChange={() => handleResultFilter("draw")}
          checked={searchParams.getAll(FILTER_RESULT_KEY).includes("draw")}
        />
        <label
          htmlFor="result-draw"
          className="w-10 justify-center select-none cursor-pointer border h-10 flex items-center font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-neutral-50 peer-checked:text-gray-600 peer-checked:border-gray-200"
        >
          {" "}
          D{" "}
        </label>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          id="result-lose"
          className="peer hidden"
          onChange={() => handleResultFilter("lose")}
          checked={searchParams.getAll(FILTER_RESULT_KEY).includes("lose")}
        />
        <label
          htmlFor="result-lose"
          className="w-10 justify-center select-none cursor-pointer border h-10 flex items-center font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-neutral-50 peer-checked:text-red-600 peer-checked:border-gray-200 rounded-r border-l-0"
        >
          {" "}
          L{" "}
        </label>
      </div>
    </div>
  );
}
