"use client";

import { usePopbar } from "@/hooks/usePopbar";
import { PanelLeftClose } from "lucide-react";

export function Popbar() {
  const { popStatus, handlePopStatus } = usePopbar();

  function handlePopStatusOnCurrent(e: React.MouseEvent) {
    if (e.currentTarget === e.target) {
      handlePopStatus(popStatus === "close" ? "open" : "close");
    }
  }

  return (
    <div
      className={`z-50 w-full h-full bg-red-600/10 fixed lg:hidden ${
        popStatus === "open" ? "block" : "hidden"
      }`}
      onClick={(e) => handlePopStatusOnCurrent(e)}
    >
      <div className="h-full w-64 bg-red-600 pr-[1px]">
        <div className="w-full h-full bg-blue-600">
          <div className="flex flex-col w-full h-full gap-8">
            <div className="w-full h-16 flex items-center px-4">
              <div className="flex flex-nowrap gap-4 h-full items-center">
                <PanelLeftClose
                  onClick={() => handlePopStatus("close")}
                  className="size-5"
                />
                <div className="size-10 flex justify-center items-center bg-neutral-100">
                  <span className="font-black">GR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
