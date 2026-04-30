"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import createWindowsStore from "@/components/windows/context/windows-store";
import WindowsActionsContext from "@/components/windows/context/windows-actions-context";
import WindowsStoreContext from "@/components/windows/context/windows-store-context";
import PositionRegistryProvider from "@/components/windows/context/position-registry-provider";

type WindowsProviderProps = {
  children: ReactNode;
};

const WindowsProvider = ({ children }: WindowsProviderProps) => {
  const [store] = useState(() => createWindowsStore());

  return (
    <PositionRegistryProvider>
      <WindowsStoreContext.Provider value={store}>
        <WindowsActionsContext.Provider value={store.actions}>
          {children}
        </WindowsActionsContext.Provider>
      </WindowsStoreContext.Provider>
    </PositionRegistryProvider>
  );
};

export default WindowsProvider;
