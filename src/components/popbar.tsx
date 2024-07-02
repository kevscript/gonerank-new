"use client";

import { usePopbar } from "@/hooks/usePopbar";

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
              <div
                className="size-8 bg-red-600"
                onClick={() => handlePopStatus("close")}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
