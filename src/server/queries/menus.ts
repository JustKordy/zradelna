"use server";

import { db } from "~/server/db";
import { menuDishes, menus } from "~/server/db/schema";
import { eq } from "drizzle-orm";

// GET
export async function getMenu(date: Date) {
  return db.query.menus.findFirst({
    where: eq(menus.date, date),
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

// CREATE
export async function createMenu(date: Date = new Date(), soupId: number) {
  return db.insert(menus).values({
    date,
    soupId,
  });
}

export async function addMenuItems(menuId: number, dishIds: number[]) {
  const batch = dishIds.map((x) => ({ menuId, dishId: x }));

  return db.insert(menuDishes).values(batch);
}
