"use client";

import { createContext, useContext, useEffect, useState } from "react";

type PopStatus = "open" | "close";

type PopContext = {
  popStatus: PopStatus;
  handlePopStatus: (newStatus: PopStatus) => void;
};

const usePopbarHook = (): PopContext => {
  const [popStatus, setPopStatus] = useState<PopStatus>("close");

  function handlePopStatus(newStatus: PopStatus) {
    if (newStatus !== popStatus) {
      setPopStatus(newStatus);
    }
  }

  useEffect(() => {
    const closePopbar = () => {
      if (window.innerWidth > 1023 && popStatus === "open") {
        setPopStatus("close");
      }
    };

    window.addEventListener("resize", closePopbar);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", closePopbar);
    };
  }, [popStatus]);

  return { popStatus, handlePopStatus };
};

const popbarContext = createContext({} as PopContext);

export const PopbarProvider = ({ children }: { children: React.ReactNode }) => {
  const popData = usePopbarHook();
  return (
    <popbarContext.Provider value={popData}>{children}</popbarContext.Provider>
  );
};

export const usePopbar = () => useContext(popbarContext);
