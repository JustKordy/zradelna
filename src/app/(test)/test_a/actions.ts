"use server";

import { getLastMonday } from "~/lib/utils/days";
import { createMenu, getMenu, type WeekOptions } from "~/server/queries/menus";

export async function lala() {
  console.log("LALA");
  const options: WeekOptions = [
    [1, 1],
    [1, 1],
    [1, 6],
    [1, 1],
    [1, 1],
  ];
  // const data = await createMenu(getLastMonday(), options);
  const data = await getMenu();
  console.log(data);
}
