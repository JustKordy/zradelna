"use server";

import { getMenu } from "~/server/queries/menus";

export async function lala() {
  console.log("LALA");
  const week = await getMenu(new Date());
  console.log(week);
  console.log(week?.menusToDIshes[0]?.dishes.name);
}
