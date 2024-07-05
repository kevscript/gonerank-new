"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { usePopbar } from "@/hooks/usePopbar";
import { PanelLeftClose } from "lucide-react";
import { useRef } from "react";

export function Popbar() {
  const { popStatus, handlePopStatus } = usePopbar();
  const barRef = useRef(null);
  function handleOutsideClick() {
    if (popStatus === "open") {
      handlePopStatus("close");
    }
  }

  useOutsideClick({ ref: barRef, action: handleOutsideClick });

  return (
    <div
      className={`z-50 w-full h-full fixed bg-gray-600/80 lg:hidden ${
        popStatus === "open" ? "block" : "hidden"
      }`}
    >
      <div ref={barRef} className={`h-full w-64 bg-neutral-200 pr-[1px]`}>
        <div className="w-full h-full bg-white">
          <div className="flex flex-col w-full h-full gap-8">
            <div className="w-full h-16 flex items-center px-4">
              <div className="flex flex-nowrap gap-4 h-full items-center">
                <PanelLeftClose
                  onClick={() => handlePopStatus("close")}
                  className="size-5"
                />
              </div>
            </div>

            <div className="w-full h-16 bg-red-100">
              <span>Navigation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
