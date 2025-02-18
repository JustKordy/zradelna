"use client";

import { useEffect, useState } from "react";
import { useWeekContext } from "~/lib/hooks/useWeekContext";
import { getMenusInRange } from "~/server/queries/menus";
import { Spinner } from "./spinner";

type Menus = Awaited<ReturnType<typeof getMenusInRange>>;

export function MenuSelector() {
  const weekCtx = useWeekContext();
  const [menus, setMenus] = useState<Menus>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const week = weekCtx.week;
    if (!week) return;

    // Fetch menu
    setIsLoading(true);
    getMenusInRange(week.start, week.end)
      .then((x) => setMenus(x))
      .then(() => setIsLoading(false))
      .catch((e) => console.error(e));
  }, [weekCtx]);

  // Loading indicator

  if (isLoading) {
    return (
      <div className="h-[100%]">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {menus.map((x) => (
        <DayMenu key={x.id} menu={x} />
      ))}
    </div>
  );
}

function DayMenu(props: { menu: Menus[number] }) {
  const date = props.menu.date.toLocaleDateString("cs-CZ", {
    weekday: "long",
  });
  return (
    <div>
      <p>{date}</p>
    </div>
  );
}
