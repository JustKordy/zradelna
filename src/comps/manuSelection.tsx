"use client";

import { useWeekSelector } from "~/lib/hooks/useWeekSelector";
import { WeekSelector } from "./weekSelector";

export function MenuSelection() {
  const weekObj = useWeekSelector();

  return (
    <>
      <WeekSelector {...weekObj} />
    </>
  );
}
