"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { type MenuChoiceWeek } from "~/types/menuChoices";
import { db } from "../db";
import { userMenus } from "../db/schema";
import { type Week, days } from "~/types/date";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  } else {
    return user;
  }
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("[ERROR][AUTH]: Failed to sign user out: ", error);
    redirect("/error");
  }

  console.log("[INFO][AUTH]: Successfully sign user out");
}

// MENU
export async function userChoice(menuId: number, choices: MenuChoiceWeek) {
  // Get user id
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new Error("unauthorized");

  // Create choices
  const week: Week = {};
  choices.forEach((choice, index) => {
    if (choice !== null) {
      week[days[index]!] = choice;
    }
  });

  // Insert to the db
  await db.insert(userMenus).values({
    userId: user.id,
    menuId,
    ...week,
  });
}
