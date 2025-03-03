"use server";

import { and, eq, ilike } from "drizzle-orm";
import { db } from "~/server/db";
import { dishes, menuDishes } from "~/server/db/schema";

// CREATE
export async function addDish(
  name: string,
  description?: string,
  isSoup = false,
  imgURL?: string,
) {
  console.log("[INFO][DB]: Adding dish: ", name);
  return db.insert(dishes).values({
    name,
    description,
    imgURL,
    isSoup,
  });
}

// GET
// Finds dishes by the name
export async function findDish(query: string, soup = false) {
  return db
    .select()
    .from(dishes)
    .where(and(ilike(dishes.name, `%${query}%`), eq(dishes.isSoup, soup)))
    .limit(50);
}

// DELETE
// Deletes a dish by id
export async function deleteDish(dishId: number) {
  return db.delete(dishes).where(eq(dishes.id, dishId));
}
