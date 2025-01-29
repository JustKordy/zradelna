"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";

// ADD FORM VALIDATION

export async function login(formData: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  console.log("[AUTH]: Login user ", data.user?.id);
  console.log("[AUTH][ERROR]: ", error);

  if (error) redirect("/error");
  redirect("/");
}

// ADD FORM VALIDATION

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  console.log("[AUTH]: New user ", data.user?.id);
  console.log("[AUTH][ERROR]: ", error);

  if (error) redirect("/error");
  redirect("/");
}
