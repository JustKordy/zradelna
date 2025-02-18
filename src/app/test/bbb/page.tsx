"use client";
import { WeekSelector } from "~/comps/weekSelector";
import { useWeekContext } from "~/lib/hooks/useWeekContext";

export default function Page() {
  const { week, setWeek } = useWeekContext();
  return (
    <main>
      <WeekSelector />
      {week ? week.start.toISOString() : "no"}
    </main>
  );
}
