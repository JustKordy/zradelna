import { useCallback, useMemo, useState } from "react";
import { getWeeksInYear } from "~/lib/weeks";
import type { Week } from "~/types/week";
import { useWeekContext } from "./useWeekContext";

const MONTHS = [
  "Leden",
  "Únor",
  "Březen",
  "Duben",
  "Květen",
  "Červen",
  "Červenec",
  "Srpen",
  "Září",
  "Říjen",
  "Listopad",
  "Prosinec",
] as const;

// Finds to which week does the `date` belong
function getWeekIndexFromDate(weeks: Week[], date: Date = new Date()) {
  // The same date with different time doesn't equal so we have to null the time
  date.setHours(0, 0, 0, 0);
  // Show the next week on weekends
  const day = date.getUTCDay();
  if (day === 6 || day === 0) {
    // Find the next Monday by adding days needed to reach Monday
    const nextMonday = new Date(date);
    const daysToAdd = day === 6 ? 2 : 1; // Add 2 days for Saturday, 1 for Sunday
    nextMonday.setUTCDate(date.getUTCDate() + daysToAdd);
    // Find the week containing this Monday
    return weeks.findIndex((x) => nextMonday >= x.start && nextMonday <= x.end);
  }

  const i = weeks.findIndex((x) => date >= x.start && date <= x.end);
  return i === -1 ? 0 : i;
}

// Get month's weeks (month is 0-based)
export function getWeeksForMonth(
  weeks: Week[],
  month: number,
  year: number,
): Week[] {
  const filteredWeeks = weeks.filter((week) => {
    const startDate = week.start;
    return startDate.getMonth() === month && startDate.getFullYear() === year;
  });

  // Return the first 4 weeks
  return filteredWeeks.slice(0, 4);
}

export function useWeekSelector() {
  const weekCtx = useWeekContext();
  // Get all weeks in a year
  const weeks = useMemo(() => getWeeksInYear(new Date().getFullYear()), []);
  // The current week
  const [weekIdx, setWeekIdx] = useState(getWeekIndexFromDate(weeks));

  // Derived state
  const week = weeks[weekIdx];
  if (!week) throw new Error("Invalid week index");
  const month = MONTHS[week.start.getMonth()];
  if (!month) throw new Error("Invalid month index");
  // Set the week context
  weekCtx.setWeek(week);

  const monthWeeks = getWeeksForMonth(
    weeks,
    week.start.getMonth(),
    week.start.getFullYear(),
  );

  // Mutation methods
  const nextMonth = useCallback(() => {
    setWeekIdx((currentIdx) => {
      const currentMonth = week.start.getMonth();
      const currentYear = week.start.getFullYear();

      // Find the first week of the next month
      const nextMonthIdx = weeks.findIndex((week) => {
        const weekMonth = week.start.getMonth();
        const weekYear = week.start.getFullYear();

        if (currentMonth === 11) {
          // If current month is December, look for January of next year
          return weekMonth === 0 && weekYear === currentYear + 1;
        }
        // Otherwise look for next month in same year
        return weekMonth === currentMonth + 1 && weekYear === currentYear;
      });

      return nextMonthIdx >= 0 ? nextMonthIdx : currentIdx;
    });
  }, [week, weeks]);
  const prevMonth = useCallback(() => {
    setWeekIdx((currentIdx) => {
      const currentMonth = week.start.getMonth();
      const currentYear = week.start.getFullYear();

      // Find the first week of the previous month
      const prevMonthIdx = weeks.findIndex((week) => {
        const weekMonth = week.start.getMonth();
        const weekYear = week.start.getFullYear();

        if (currentMonth === 0) {
          // If current month is January, look for December of previous year
          return weekMonth === 11 && weekYear === currentYear - 1;
        }
        // Otherwise look for previous month in same year
        return weekMonth === currentMonth - 1 && weekYear === currentYear;
      });

      return prevMonthIdx >= 0 ? prevMonthIdx : currentIdx;
    });
  }, [week, weeks]);

  const selectWeek = useCallback(
    (date: Date) => {
      setWeekIdx(getWeekIndexFromDate(weeks, date));
    },
    [weeks],
  );

  return {
    week,
    weeks: monthWeeks,
    month,
    nextWeek: nextMonth,
    prevWeek: prevMonth,
    selectWeek,
  };
}
