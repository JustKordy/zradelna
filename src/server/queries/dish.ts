"use server";

import { db } from "~/server/db";
import { dishes } from "~/server/db/schema";

// CREATE
export async function addDish(
  name: string,
  description?: string,
  imgURL?: string,
) {
  console.log("[INFO][DB]: Adding dish: ", name);
  return db.insert(dishes).values({
    name,
    description,
    imgURL,
  });
}
