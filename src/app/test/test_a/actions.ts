"use server";

// import { addDish, findDish } from "~/server/queries/dish";
import {
  // addMenuItems,
  // createMenu,
  // getMenu,
  getMenusInRange,
} from "~/server/queries/menus";

export async function lala() {
  console.log("LALA");
  // const week = await getMenu(new Date());
  // const data = await createMenu(new Date("2025-02-04"), 3);
  // const data = await addMenuItems(3, [1, 2]);
  // const data = await addDish(
  //   "Pizza",
  //   "Italian circle",
  //   "https://www.ocu.org/-/media/ocu/images/home/alimentacion/alimentos/pizzas_selector_1600x900.jpg?rev=6a81e278-07fc-4e95-9ba1-361063f35adf&hash=B8B1264AB6FC3F4B1AE140EB390208CD",
  // );
  // const data = await findDish("rizoto");
  const data = await getMenusInRange(
    new Date("2025-02-01"),
    new Date("2025-02-16"),
  );

  console.dir(data, { depth: Infinity });
}
