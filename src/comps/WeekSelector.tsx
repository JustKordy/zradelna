"use client";

import { useWeekSelector } from "~/lib/hooks/useWeekSelector";

export function WeekSelector() {
  const { week, nextWeek, prevWeek } = useWeekSelector();
  return (
    <div>
      <h1>Week Selector</h1>
      <div>
        From: {week.start.toISOString()} To: {week.end.toISOString()}
      </div>
      <button onClick={nextWeek} className="border p-3">
        +
      </button>
      <button onClick={prevWeek} className="border p-3">
        -
      </button>
    </div>
  );
}
