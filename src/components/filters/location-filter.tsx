"use client";

import { VALID_LOCATION_PARAMS } from "@/constants";
import { Home, Plane } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FILTER_LOCATION_KEY = "location" as const;

export function LocationFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleLocationFilter(
    newLocation: (typeof VALID_LOCATION_PARAMS)[number]
  ) {
    const newParams = new URLSearchParams(searchParams.toString());
    let locationParams = newParams.getAll(FILTER_LOCATION_KEY);

    if (!locationParams.includes(newLocation)) {
      newParams.append(FILTER_LOCATION_KEY, newLocation);
    } else {
      newParams.delete(FILTER_LOCATION_KEY, newLocation);
    }

    router.push(`${pathname}?${newParams}`);
  }

  return (
    <div className="flex">
      <div className="flex">
        <input
          type="checkbox"
          id="location-home"
          className="peer hidden"
          onChange={() => handleLocationFilter("home")}
          checked={searchParams.getAll(FILTER_LOCATION_KEY).includes("home")}
        />
        <label
          htmlFor="location-home"
          className="w-10 justify-center select-none cursor-pointer border h-10 flex items-center font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-neutral-50 peer-checked:text-gray-900 peer-checked:border-gray-200 rounded-l border-r-0"
        >
          <Home />
        </label>
      </div>
      <div className="flex">
        <input
          type="checkbox"
          id="location-away"
          className="peer hidden"
          onChange={() => handleLocationFilter("away")}
          checked={searchParams.getAll(FILTER_LOCATION_KEY).includes("away")}
        />
        <label
          htmlFor="location-away"
          className="w-10 justify-center select-none cursor-pointer border h-10 flex items-center font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-neutral-50 peer-checked:text-gray-900 peer-checked:border-gray-200 rounded-r"
        >
          <Plane />
        </label>
      </div>
    </div>
  );
}
