"use client";

import { Suspense } from "react";
import { SidebarNavigation } from "./sidebar-navigation";
import { UserProfile } from "./user-profile";

export function Sidebar() {
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
            <Suspense>
              <SidebarNavigation />
            </Suspense>
          </div>
          <div className="w-full flex justify-center">
            <UserProfile horizontal />
          </div>
        </div>
      </div>
    </div>
  );
}
