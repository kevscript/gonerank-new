"use client";

import { Home, Shirt, Swords } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Sidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div className="w-16 h-full bg-neutral-200 pr-[1px] hidden lg:block">
      <div className="w-full h-full bg-white">
        <div className="flex flex-col w-full h-full justify-between py-4">
          <div className="w-full flex justify-center">
            <div className="size-10 flex justify-center items-center bg-neutral-100">
              <span className="font-black">GR</span>
            </div>
          </div>
          <div className="w-full">
            <ul className="flex flex-col">
              <Link href={"/home"}>
                <li
                  className={`w-full h-16 flex justify-center items-center ${
                    pathname.startsWith("/home") && "bg-blue-100"
                  }`}
                >
                  <Home className="size-6" />
                </li>
              </Link>
              <Link href={`/matches?${searchParams.toString()}`}>
                <li
                  className={`w-full h-16 flex justify-center items-center ${
                    pathname.startsWith("/matches") && "bg-blue-100"
                  }`}
                >
                  <Swords className="size-6" />
                </li>
              </Link>
              <Link href={`/players?${searchParams.toString()}`}>
                <li
                  className={`w-full h-16 flex justify-center items-center ${
                    pathname.startsWith("/players") && "bg-blue-100"
                  }`}
                >
                  <Shirt className="size-6" />
                </li>
              </Link>
            </ul>
          </div>
          <div className="w-full flex justify-center">
            <div className="size-10 rounded-full bg-neutral-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
