"use client";

import { useEffect } from "react";

import useOpenWindowsSnapshot from "@/hooks/windows/use-open-windows-snapshot";

const WindowsUrlSync = () => {
  const openWindows = useOpenWindowsSnapshot();

  useEffect(() => {
    const params = new URLSearchParams();

    openWindows.forEach((slug) => params.set(slug, ""));

    const search = params.toString();

    if (!search) {
      return globalThis.history.replaceState(null, "", "/");
    }

    globalThis.history.replaceState(null, "", `/?${search}`);
  }, [openWindows]);

  return null;
};

export default WindowsUrlSync;
