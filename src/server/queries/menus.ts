"use server";

import { db } from "~/server/db";
import { menus } from "~/server/db/schema";
import { between, eq } from "drizzle-orm";
import { getUser } from "./user";

// GET
export async function getMenu(date: Date) {
  return db.query.menus.findFirst({
    where: eq(menus.date, date),
  });
}

// Gets all menus in range
export async function getMenusInRange(from: Date, to: Date) {
  return db.query.menus.findMany({
    where: between(menus.date, from, to),
  });
}

// This fetches all menus in a range, but includes the choices user already made.
export async function getMenusInRangeWithUserSelect(from: Date, to: Date) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  return db.query.menus.findMany({
    where: between(menus.date, from, to),
    with: {
      menusToUserChoices: true,
    },
  });
}

// CREATE
export async function createMenu(
  date: Date = new Date(),
  soup: string,
  dishes: string[],
) {
  console.log(
    "[INFO][DB]: Creating a new menu: ",
    date.toISOString().split("T")[0],
  );
  return db.insert(menus).values({
    date,
    soup,
    dishes,
  });
}
