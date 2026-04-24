"use client";

import { useContext } from "react";

import WindowsActionsContext from "@/components/windows/context/windows-actions-context";

const useWindowsActions = () => {
  const actions = useContext(WindowsActionsContext);

  if (!actions) {
    throw new Error("useWindowsActions must be used within a WindowsProvider");
  }

  return actions;
};

export default useWindowsActions;
