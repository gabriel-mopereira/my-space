"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import PositionRegistryProvider from "@/components/windows/context/position-registry-provider";
import WindowsActionsContext from "@/components/windows/context/windows-actions-context";
import createWindowsStore from "@/components/windows/context/windows-store";
import WindowsStoreContext from "@/components/windows/context/windows-store-context";

type WindowsProviderProps = {
  children: ReactNode;
  initialOpen?: Array<string>;
};

const WindowsProvider = ({ children, initialOpen = [] }: WindowsProviderProps) => {
  const [store] = useState(() => createWindowsStore({ initialOpen }));

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
