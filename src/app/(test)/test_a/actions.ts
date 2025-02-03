"use server";

import { getMenu } from "~/server/queries/menus";

export async function lala() {
  console.log("LALA");
  const week = await getMenu(new Date());
  console.dir(week, { depth: Infinity });
}
