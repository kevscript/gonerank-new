"use client";

import { usePopbar } from "@/hooks/usePopbar";
import { PanelLeftOpen } from "lucide-react";
import { UserProfile } from "./user-profile";

export function Header() {
  const { handlePopStatus, popStatus } = usePopbar();

  return (
    <header className="flex px-4 lg:px-8 min-w-0 max-w-screen border-b h-16 lg:hidden">
      <div className="w-full h-full flex justify-between items-center">
        <div className="flex flex-nowrap gap-4 h-full items-center">
          <PanelLeftOpen
            onClick={() => handlePopStatus("open")}
            className="size-5"
          />
          <div className="size-10 flex justify-center items-center bg-neutral-100">
            <span className="font-black">GR</span>
          </div>
        </div>

        <UserProfile />
      </div>
    </header>
  );
}
