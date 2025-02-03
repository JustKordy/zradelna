"use server";

import { db } from "~/server/db";
import { dishes } from "~/server/db/schema";

export async function addDish(dish: typeof dishes.$inferInsert) {
  console.log("[INFO][DB]: Adding dish: ", dish.name);
  return db.insert(dishes).values(dish);
}
