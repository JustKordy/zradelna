"use client";

import { useEffect, useState } from "react";
import { useWeekContext } from "~/lib/hooks/useWeekContext";
import { getMenusInRange } from "~/server/queries/menus";

type Menus = Awaited<ReturnType<typeof getMenusInRange>>;

export function MenuSelector() {
  const weekCtx = useWeekContext();
  const [menus, setMenus] = useState<Menus>([]);

  useEffect(() => {
    const week = weekCtx.week;
    if (!week) return;

    getMenusInRange(week.start, week.end)
      .then((x) => setMenus(x))
      .catch((e) => console.error(e));
  }, [weekCtx]);

  return (
    <div>
      {weekCtx.week?.start.toISOString()} - {weekCtx.week?.end.toISOString()}
    </div>
  );
}
