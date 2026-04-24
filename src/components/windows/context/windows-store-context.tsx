"use client";

import { createContext } from "react";

import type { WindowsStore } from "@/components/windows/context/windows-store";

const WindowsStoreContext = createContext<WindowsStore | null>(null);

export default WindowsStoreContext;
