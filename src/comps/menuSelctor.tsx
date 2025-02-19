"use client";

import { useEffect, useState } from "react";
import { useWeekContext } from "~/lib/hooks/useWeekContext";
import { getMenusInRange } from "~/server/queries/menus";
import { Spinner } from "./spinner";
import { capitalize } from "~/lib/utils";

type Menus = Awaited<ReturnType<typeof getMenusInRange>>;

export function MenuSelector() {
  const weekCtx = useWeekContext();
  const [menus, setMenus] = useState<Menus>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const week = weekCtx.week;
    if (!week) return;

    // Fetch menu
    // Server query
    setIsLoading(true);
    getMenusInRange(week.start, week.end)
      .then((x) => setMenus(x))
      .then(() => setIsLoading(false))
      .catch((e) => console.error(e));
  }, [weekCtx]);

  // Loading indicator

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="flex flex-1 justify-center p-6">
      <div className="flex w-[70%] bg-red-400">
        {menus.map((x) => (
          <DayMenu key={x.id} menu={x} />
        ))}
      </div>
    </section>
  );
}

function DayMenu(props: { menu: Menus[number] }) {
  const date = props.menu.date.toLocaleDateString("cs-CZ", {
    weekday: "long",
  });
  return (
    <div>
      <p>{capitalize(date)}</p>
    </div>
  );
}
