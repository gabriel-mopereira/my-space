"use client";

import { useEffect } from "react";

import { NAV_OPTIONS } from "@/components/navigation/options";

import useOpenWindowsSnapshot from "@/hooks/windows/use-open-windows-snapshot";
import useWindowsActions from "@/hooks/windows/use-windows-actions";

const getInitialOpen = (params: Array<string>): Array<string> => {
  if (params.length === 0) {
    return ["about"];
  }

  return params.filter((key) =>
    NAV_OPTIONS.some((opt) => opt.slug === key && !opt.disabled),
  );
};

const WindowsUrlSync = () => {
  const openWindows = useOpenWindowsSnapshot();
  const { openWindow } = useWindowsActions();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const paramKeys = urlSearchParams.keys().toArray();

    const initialOpen = getInitialOpen(paramKeys);

    initialOpen.forEach((window) => openWindow(window));
  }, [openWindow]);

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
