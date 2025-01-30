"use server";

import { getMenu } from "~/server/queries/menus";

export async function lala() {
  console.log("LALA");
  const data = await getMenu();
  console.log(data);
}
