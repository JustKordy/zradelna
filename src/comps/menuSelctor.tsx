"use client";

import { useEffect } from "react";
import { useWeekContext } from "~/lib/hooks/useWeekContext";

export function MenuSelector() {
  const weekCtx = useWeekContext();

  useEffect(() => {
    console.log(weekCtx.week);
  }, [weekCtx]);

  return (
    <div>
      {weekCtx.week?.start.toISOString()} - {weekCtx.week?.end.toISOString()}
    </div>
  );
}
