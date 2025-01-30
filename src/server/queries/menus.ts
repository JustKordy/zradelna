"use server";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { dishes, menus } from "~/server/db/schema";

function getLastMonday(date: Date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);

  return d.toISOString().split("T")[0]!;
}

export async function getMenu() {
  // return db.query.menus.findFirst({
  //   where: eq(menus.from, getLastMonday()),
  //   columns: {
  //     wednesdayDish1: true,
  //   },
  // with: {
  //   mondayDish1: {
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       imgURL: true,
  //     },
  //   },
  //   mondayDish2: {
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       imgURL: true,
  //     },
  //   },
  //   tuesdayDish1: {
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       imgURL: true,
  //     },
  //   },
  //   tuesdayDish2: {
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       imgURL: true,
  //     },
  //   },
  //   wednesdayDish1: {
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       imgURL: true,
  //     },
  //   },
  //   wednesdayDish2: {
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       imgURL: true,
  //     },
  //   },
  //   thursdayDish1: {
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       imgURL: true,
  //     },
  //   },
  //   thursdayDish2: {
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       imgURL: true,
  //     },
  //   },
  //   fridayDish1: {
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       imgURL: true,
  //     },
  //   },
  //   fridayDish2: {
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //       imgURL: true,
  //     },
  //   },
  // },
  // });
  return db.query.menus.findFirst({
    where: (menus, { eq }) => eq(menus.fromDate, getLastMonday()),
    with: {
      mondayOption1: true,
      mondayOption2: true,
      tuesdayOption1: true,
      tuesdayOption2: true,
      wednesdayOption1: true,
      wednesdayOption2: true,
      thursdayOption1: true,
      thursdayOption2: true,
      fridayOption1: true,
      fridayOption2: true,
    },
  });
}
