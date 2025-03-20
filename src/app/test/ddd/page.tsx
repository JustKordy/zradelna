"use client";

import {
  createMenu,
  getMenusInRangeWithUserSelect,
} from "~/server/queries/menus";
import { makeUserChoice } from "~/server/queries/user";

function getDateInThreeDays() {
  const today = new Date();
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  return threeDaysLater;
}

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-500">
      <h1>Hello World</h1>
      <button
        onClick={async () =>
          console.log(await makeUserChoice(3, "Space Lasagna"))
        }
        // onClick={async () =>
        //   console.log(
        //     await getMenusInRangeWithUserSelect(
        //       new Date(),
        //       getDateInThreeDays(),
        //     ),
        //   )
        // }
        className="rounded-xl border border-zinc-800 p-3"
      >
        Hello From the button
      </button>
    </main>
  );
}
