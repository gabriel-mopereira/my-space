"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import createWindowsStore from "@/components/windows/context/windows-store";
import WindowsActionsContext from "@/components/windows/context/windows-actions-context";
import WindowsStoreContext from "@/components/windows/context/windows-store-context";
import PositionRegistryProvider from "@/components/windows/context/position-registry-provider";

type WindowsProviderProps = {
  children: ReactNode;
  initialOpen?: Array<string>;
};

const WindowsProvider = ({
  children,
  initialOpen = [],
}: WindowsProviderProps) => {
  const [store, setStore] = useState(() => createWindowsStore(initialOpen));
  // Void the setStore function to statisfy linter.
  void setStore;

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
