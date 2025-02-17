"use client";

import { useWeekSelector } from "~/lib/hooks/useWeekSelector";
import { WeekSelector } from "./weekSelector";
import { Spinner } from "./spinner";

export function MenuSelection() {
  const weekObj = useWeekSelector();

  return (
    <>
      <WeekSelector {...weekObj} />
      <Spinner />
    </>
  );
}
