"use client";

import { useEffect, useState } from "react";
import { Spinner } from "~/comps/spinner";
import { useWeekContext } from "~/lib/hooks/useWeekContext";
import { capitalize } from "~/lib/utils";
import { getOrdersByMenuId } from "~/server/queries/menus";

type Orders = Awaited<ReturnType<typeof getOrdersByMenuId>>;

export function MenuDisplay() {
  const weekCtx = useWeekContext();
  const [orders, setOrders] = useState<Orders>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const week = weekCtx.week;
    if (!week) return;

    // Fetching of the menu menu
    // It's a server action that returns menus + choices user already made.
    setIsLoading(true);
    getOrdersByMenuId(week.start, week.end)
      .then((x) => setOrders(x))
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
    <div className="flex justify-center p-8">
      <div className="w-[60%]">
        {orders.map((x) => (
          <div key={x.menu_id} className="p-6">
            <div className="relative overflow-x-auto">
              <h2 className="text-lg font-semibold text-gray-900">
                {capitalize(
                  x.menu_date.toLocaleDateString("cs-CZ", { weekday: "long" }),
                )}{" "}
                -{" "}
                {x.menu_date.toLocaleDateString("cs-CZ", {
                  dateStyle: "medium",
                })}
              </h2>
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Jídlo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Počet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Dishes key={crypto.randomUUID()} order={x} />
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dishes(props: { order: Orders[number] }) {
  return (
    <>
      {props.order.dish_totals.map((x) => (
        <tr
          key={crypto.randomUUID()}
          className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <>
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              {x.dish}
            </th>
            <td className="px-6 py-4">{Number(x.total)}</td>
          </>
        </tr>
      ))}
    </>
  );
}
