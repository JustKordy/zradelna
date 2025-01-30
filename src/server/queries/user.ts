"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";

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
