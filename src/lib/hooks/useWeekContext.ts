"use client";

import { useContext } from "react";
import { WeekContext } from "~/lib/providers/weekStoreProvider";

export function useWeekContext() {
  const consumer = useContext(WeekContext);
  if (!consumer)
    throw new Error(
      "useWeekContext() must be used in the <WeekContextProvidder />",
    );

  return consumer;
}
