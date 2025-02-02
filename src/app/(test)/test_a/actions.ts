"use server";

import { getMenu } from "~/server/queries/menus";
import { makeUserChoice } from "~/server/queries/user";
import type { MenuChoiceWeek } from "~/types/menuChoices";

export async function lala() {
  console.log("LALA");
  const options: MenuChoiceWeek = [1, 1, null, null, 2];
  // const data = await createMenu(getLastMonday(), options);
  const week = await getMenu();
  if (!week) throw new Error(":(");
  const data = await makeUserChoice(week.id, options);
  console.log(data);
}
