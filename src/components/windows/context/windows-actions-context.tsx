"use client";

import { createContext } from "react";

import type { WindowsActions } from "@/components/windows/context/windows-store";

const WindowsActionsContext = createContext<WindowsActions | null>(null);

export default WindowsActionsContext;
