"use client";

import { useContext } from "react";
import WindowsContext from "@/components/windows/context/windows-context";

const useWindows = () => {
  const context = useContext(WindowsContext);

  if (!context) {
    throw new Error("useWindows must be used within a WindowsProvider");
  }

  return context;
};

export default useWindows;
