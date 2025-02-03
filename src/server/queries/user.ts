"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { env } from "~/env";
import { db } from "../db";
import { userChoices } from "../db/schema";

/// AUTH

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

  console.log("[INFO][AUTH]: Successfully signed user out");
  // Maybe this should redirect to `/app` or something
  redirect("/");
}

export async function LogInWithAzure() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "azure",
    options: {
      // We need profile to get user's name. (openid is some bs ms requires)
      scopes: "openid profile email",
      redirectTo: `http://localhost:3000/`,
      queryParams:{
        access_type: "offline",
        prompt: "select_account"
      } 
    },
  });

  if (error) {
    console.error("[ERROR][AUTH][AZURE]: Failed to sign user in: ", error);
    redirect("/error");
  }

  if (data.url) {
    console.log("[INFO][AUTH]: Redirection user to Azure OAuth: ", data.url);
    redirect(data.url);
  }
}

// Menu
export async function makeUserChoice(menuId: number, dishId: number) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  return db.insert(userChoices).values({
    userId: user.id,
    menuId,
    dishId,
  });
}
