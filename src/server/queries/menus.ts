"use server";

import { db } from "~/server/db";
import { menuDishes, menus, userChoices } from "~/server/db/schema";
import { between, eq } from "drizzle-orm";
import { getUser } from "./user";

// GET
export async function getMenu(date: Date) {
  return db.query.menus.findFirst({
    where: eq(menus.date, date),
  });
}

// Get count of user choices per mennu
export async function getUserChoicesCount(date: Date) {
  return 5;
}

// Gets all menus in range
export async function getMenusInRange(from: Date, to: Date) {
  return db.query.menus.findMany({
    where: between(menus.date, from, to),
    with: {
      soup: true,
      menusToDishes: {
        with: {
          dishes: true,
        },
      },
    },
  });
}

// This fetches all menus in a range, but includes the choices user already made.
export async function getMenusInRangeWithUserSelect(from: Date, to: Date) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  return db.query.menus.findMany({
    where: between(menus.date, from, to),
    with: {
      userChoices: {
        where: eq(userChoices.userId, user.id),
      },
      soup: true,
      menusToDishes: {
        with: {
          dishes: true,
        },
      },
    },
  });
}

// CREATE
export async function createMenu(date: Date = new Date(), soupId: number) {
  console.log(
    "[INFO][DB]: Creating a new menu: ",
    date.toISOString().split("T")[0],
  );
  return db.insert(menus).values({
    date,
    soupId,
  });
}

export async function addMenuItems(menuId: number, dishIds: number[]) {
  console.log(
    `[INFO][DB]: Creating a new menu item: menuId: ${menuId}: dishId: ${JSON.stringify(dishIds)}`,
  );
  const batch = dishIds.map((x) => ({ menuId, dishId: x }));

  return db.insert(menuDishes).values(batch);
}
