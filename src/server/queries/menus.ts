"use server";

import { db } from "~/server/db";
import { menus } from "../db/schema";
import { getLastMonday } from "~/lib/utils/days";

/// GET

export async function getMenu() {
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

/// CREATE

type Options = [number, number];
export type WeekOptions = [Options, ...Options[]] & { length: 5 };

function weekOptionsToObject(options: WeekOptions) {
  return {
    mondayOption1Id: options[0][0],
    mondayOption2Id: options[0][1],
    tuesdayOption1Id: options[1]![0],
    tuesdayOption2Id: options[1]![1],
    wednesdayOption1Id: options[2]![0],
    wednesdayOption2Id: options[2]![1],
    thursdayOption1Id: options[3]![0],
    thursdayOption2Id: options[3]![1],
    fridayOption1Id: options[4]![0],
    fridayOption2Id: options[4]![1],
  };
}
export async function createMenu(from: string, options: WeekOptions) {
  return db.insert(menus).values({
    fromDate: from,
    ...weekOptionsToObject(options),
  });
}
