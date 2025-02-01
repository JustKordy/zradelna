"use server";

import { getLastMonday } from "~/lib/utils/days";
import { userChoice } from "~/server/queries/user";
import { MenuChoiceWeek } from "~/types/menuChoices";

export async function lala() {
  console.log("LALA");
  const options: MenuChoiceWeek = [1, 1, null, null, 2];
  // const data = await createMenu(getLastMonday(), options);
  // const data = await getMenu();
  const data = await userChoice(getLastMonday(), options);
  console.log(data);
}
