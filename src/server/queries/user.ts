"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { env } from "~/env";

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
      redirectTo: `http://${env.DOMAIN}/auth/callback`,
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
