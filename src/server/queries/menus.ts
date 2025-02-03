"use server";

import { db } from "~/server/db";
import { menus } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function getMenu(date: Date) {
  return db.query.menus.findFirst({
    where: eq(menus.date, date),
    with: {
      menusToDIshes: {
        with: {
          dishes: true,
        },
      },
    },
  });
}
