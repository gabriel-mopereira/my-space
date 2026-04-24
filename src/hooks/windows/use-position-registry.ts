"use client";

import { useContext } from "react";

import PositionRegistryContext from "@/components/windows/context/position-registry-context";

const usePositionRegistry = () => {
  const context = useContext(PositionRegistryContext);

  if (!context) {
    throw new Error(
      "usePositionRegistry must be used within a PositionRegistryProvider",
    );
  }

  return context;
};

export default usePositionRegistry;
