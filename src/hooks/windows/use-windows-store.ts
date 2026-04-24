"use client";

import { useContext } from "react";

import WindowsStoreContext from "@/components/windows/context/windows-store-context";

const useWindowsStore = () => {
  const store = useContext(WindowsStoreContext);

  if (!store) {
    throw new Error("useWindowsStore must be used within a WindowsProvider");
  }

  return store;
};

export default useWindowsStore;
