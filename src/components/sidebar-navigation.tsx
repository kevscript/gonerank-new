"use client";

import { Calendar, Home, Shield, Shirt, Swords, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function SidebarNavigation() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return (
      <ul className="flex flex-col">
        <Link href={"/admin/matches"}>
          <li
            className={`w-full h-16 flex justify-center items-center ${
              pathname.startsWith("/admin/matches") && "bg-neutral-200"
            }`}
          >
            <Swords className="size-6" />
          </li>
        </Link>
        <Link href={`/admin/players`}>
          <li
            className={`w-full h-16 flex justify-center items-center ${
              pathname.startsWith("/admin/players") && "bg-neutral-200"
            }`}
          >
            <Shirt className="size-6" />
          </li>
        </Link>
        <Link href={`/admin/seasons`}>
          <li
            className={`w-full h-16 flex justify-center items-center ${
              pathname.startsWith("/admin/seasons") && "bg-neutral-200"
            }`}
          >
            <Calendar className="size-6" />
          </li>
        </Link>
        <Link href={`/admin/competitions`}>
          <li
            className={`w-full h-16 flex justify-center items-center ${
              pathname.startsWith("/admin/competitions") && "bg-neutral-200"
            }`}
          >
            <Trophy className="size-6" />
          </li>
        </Link>
        <Link href={`/admin/clubs`}>
          <li
            className={`w-full h-16 flex justify-center items-center ${
              pathname.startsWith("/admin/clubs") && "bg-neutral-200"
            }`}
          >
            <Shield className="size-6" />
          </li>
        </Link>
      </ul>
    );
  }

  return (
    <ul className="flex flex-col">
      <Link href={"/home"}>
        <li
          className={`w-full h-16 flex justify-center items-center ${
            pathname.startsWith("/home") && "bg-neutral-200"
          }`}
        >
          <Home className="size-6" />
        </li>
      </Link>
      <Link href={`/matches?${searchParams.toString()}`}>
        <li
          className={`w-full h-16 flex justify-center items-center ${
            pathname.startsWith("/matches") && "bg-neutral-200"
          }`}
        >
          <Swords className="size-6" />
        </li>
      </Link>
      <Link href={`/players?${searchParams.toString()}`}>
        <li
          className={`w-full h-16 flex justify-center items-center ${
            pathname.startsWith("/players") && "bg-neutral-200"
          }`}
        >
          <Shirt className="size-6" />
        </li>
      </Link>
    </ul>
  );
}
