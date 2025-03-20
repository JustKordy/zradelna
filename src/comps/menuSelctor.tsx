"use client";

import { useActionState, useEffect, useState } from "react";
import { useWeekContext } from "~/lib/hooks/useWeekContext";
import { getMenusInRangeWithUserSelect } from "~/server/queries/menus";
import { Spinner } from "./spinner";
import { capitalize } from "~/lib/utils";
import { LoadingButton } from "./loading-button";
import { makeUserChoiceFromForm, signOut } from "~/server/queries/user";

const sideBarOptions: Array<{
  id: number;
  name: string;
  icon: string;
  onClick: () => void;
}> = [
  {
    id: 1,
    name: "Domů",
    icon: "fa-solid fa-house",
    onClick: () => console.log("idk"),
  },
  {
    id: 2,
    name: "Odhlásit se",
    icon: "fa-solid fa-sign-out",
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onClick: () => signOut(),
  },
];

type Menus = Awaited<ReturnType<typeof getMenusInRangeWithUserSelect>>;

export function MenuSelector() {
  const weekCtx = useWeekContext();
  const [menus, setMenus] = useState<Menus>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState<boolean>();

  useEffect(() => {
    const week = weekCtx.week;
    if (!week) return;

    // Fetching of the menu menu
    // It's a server action that returns menus + choices user already made.
    setIsLoading(true);
    getMenusInRangeWithUserSelect(week.start, week.end)
      .then((x) => setMenus(x))
      .then(() => setIsLoading(false))
      .catch((e) => console.error(e));
  }, [weekCtx, toggle]);

  const toggleFunction = () => {
    setToggle(!toggle);
  };

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
      <div className="flex w-full flex-col justify-center gap-2">
        {menus.length > 0 ? (
          menus.map((x) => (
            <DayMenu key={x.id} menu={x} toggleFunc={toggleFunction} />
          ))
        ) : (
          <h1 className="text-center text-xl text-orange-500">
            Pro tento týden ještě nelze objednat
          </h1>
        )}
      </div>
    </section>
  );
}

function DayMenu(props: { menu: Menus[number]; toggleFunc: () => void }) {
  type errorMsg = { error: string | undefined };
  const [error, dispatch, isPending] = useActionState<errorMsg, FormData>(
    (prevState: errorMsg, formData: FormData) =>
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
    <>
      <div className="flex items-center justify-center">
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold text-gray-900">
            <span>{capitalize(weekDay)}</span> - <span>{date}</span>
          </h3>
          <p>{props.menu.soup}</p>
          <form action={dispatch}>
            <label htmlFor={`${props.menu.id}`}>S sebou </label>

            <input
              name="togo"
              type="checkbox"
              id={`${props.menu.id}`}
              defaultChecked={props.menu.menusToUserChoices[0]?.toGo}
            />
            <input
              name="amount"
              type="number"
              id={`${props.menu.id}`}
              defaultValue={props.menu.menusToUserChoices[0]?.amount}
            />

            <ul className="rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900">
              {props.menu.dishes.map((x) => (
                <li
                  className="w-full rounded-t-lg border-b border-gray-200"
                  key={crypto.randomUUID()}
                >
                  <div className="flex items-center ps-3">
                    <input
                      id={`list-${props.menu.id}-${x}`}
                      defaultChecked={
                        props.menu.menusToUserChoices[0]?.dish === x
                      }
                      type="radio"
                      name="dish"
                      value={x}
                      required
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`list-${props.menu.id}-${x}`}
                      className="ms-2 w-full py-3 text-sm font-medium text-gray-900"
                    >
                      {capitalize(x)}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            {isPending ? (
              <LoadingButton />
            ) : (
              <>
                <button
                  type="submit"
                  className="mb-2 me-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 focus:ring-4 focus:ring-orange-300"
                  onClick={(e) => console.log(e.target)}
                >
                  Objednat
                </button>

                <span className="font-semibold text-red-700">
                  {error.error ?? ""}
                </span>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
