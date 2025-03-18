"use server";

import { db } from "~/server/db";
import { menus } from "~/server/db/schema";
import { between, eq } from "drizzle-orm";

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

// CREATE
export async function createMenu(date: Date = new Date(), soup: string, options: string[]) {
  console.log(
    "[INFO][DB]: Creating a new menu: ",
    date.toISOString().split("T")[0],
  );
  return db.insert(menus).values({date, soup, options})
}