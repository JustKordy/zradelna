"use client";

import { useActionState, useEffect, useState } from "react";
import { useWeekContext } from "~/lib/hooks/useWeekContext";
import { getMenusInRangeWithUserSelect } from "~/server/queries/menus";
import { Spinner } from "./spinner";
import { capitalize } from "~/lib/utils";
import { LoadingButton } from "./loading-button";
import { makeUserChoiceFromForm } from "~/server/queries/user";

type Menus = Awaited<ReturnType<typeof getMenusInRangeWithUserSelect>>;

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
    getMenusInRangeWithUserSelect(week.start, week.end)
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
      <div className="flex w-[70%] flex-col gap-2">
        {menus.map((x) => (
          <DayMenu key={x.id} menu={x} />
        ))}
      </div>
    </section>
  );
}

function DayMenu(props: { menu: Menus[number] }) {
  const [error, dispatch, isPending] = useActionState<
    { error: string | undefined },
    FormData
  >(
    (prevState: { error: string | undefined }, formData: FormData) =>
      makeUserChoiceFromForm(prevState, formData, props.menu.id),
    {
      error: undefined,
    },
  );

  const weekDay = props.menu.date.toLocaleDateString("cs-CZ", {
    weekday: "long",
  });
  const date = props.menu.date.toLocaleDateString("cs-CZ", {
    dateStyle: "medium",
  });
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        <span>{capitalize(weekDay)}</span> - <span>{date}</span>
      </h3>
      <p>{props.menu.soup.name}</p>
      <form action={dispatch}>
        <label htmlFor={`${props.menu.id}`}>Sebou </label>
        <input name="togo" type="checkbox" id={`${props.menu.id}`} />
        <ul className="w-1/2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900">
          {props.menu.menusToDishes.map((x) => (
            <li
              className="w-full rounded-t-lg border-b border-gray-200"
              key={crypto.randomUUID()}
            >
              <div className="flex items-center ps-3">
                <input
                  id={`list-${x.menuId}-${x.dishId}`}
                  // This should prevent users from creating more than 1 choice, but it's kinda ugly and user can't change choices they already made
                  // There should be just one choice
                  checked={props.menu.userChoices[0]?.dishId === x.dishId}
                  type="radio"
                  name="dish"
                  value={x.dishId}
                  required
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor={`list-${x.menuId}-${x.dishId}`}
                  className="ms-2 w-full py-3 text-sm font-medium text-gray-900"
                >
                  {x.dishes.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
        {isPending ? (
          // Loading button
          <LoadingButton />
        ) : (
          <button
            type="submit"
            className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          >
            Obědnat
          </button>
        )}
        <span className="font-semibold text-red-700">{error.error ?? ""}</span>
      </form>
    </div>
  );
}
