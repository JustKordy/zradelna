import { useCallback, useState } from "react";
import { getWeeksInYear } from "~/lib/weeks";
import type { Week } from "~/types/week";

// Finds to which week does the `date` belong
function getWeekIndexFromDate(weeks: Week[], date: Date = new Date()) {
  const i = weeks.findIndex((x) => date >= x.start && date <= x.end);
  return i === -1 ? 0 : i;
}

export function useWeekSelector() {
  const weeks = getWeeksInYear(new Date().getFullYear());
  const [weekIdx, setWeekIdx] = useState(getWeekIndexFromDate(weeks));

  const week = weeks[weekIdx]!;

  const nextWeek = useCallback(() => {
    setWeekIdx((prev) => (prev < weeks.length - 1 ? prev + 1 : prev));
  }, [weeks.length]);

  const prevWeek = useCallback(() => {
    setWeekIdx((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  return { week, nextWeek, prevWeek };
}
