"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { env } from "~/env";
import { db } from "../db";
import { userChoices } from "../db/schema";
import { and, eq } from "drizzle-orm";

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
      queryParams: {
        access_type: "offline",
        prompt: "select_account",
      },
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

export async function updateUserChoice(
  menuID: number,
  dishID: number,
  toGo: boolean
) {
  const user = await getUser();
  if(!user) throw new Error("Unauthorized!")

    console.log(
      `[INFO]: Updating user choice: User: ${user.id} Menu: ${menuID} Dish: ${dishID}`,
    );
    const tryFind = await db.select().from(userChoices).where(and(eq(userChoices.userId, user.id), eq(userChoices.menuId, menuID)))
    if(tryFind.length === 0) {
      return false
    }
    await db.update(userChoices).set({dishId: dishID, toGo: toGo}).where(and(eq(userChoices.menuId, menuID), eq(userChoices.userId, user.id)))
    return true

}

// Menu
export async function makeUserChoice(
  menuId: number,
  dishId: number,
  toGo: boolean,
) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  console.log(
    `[INFO]: Creating user choice: User: ${user.id} Menu: ${menuId} Dish: ${dishId}`,
  );
  return db.insert(userChoices).values({
    userId: user.id,
    menuId,
    dishId,
    toGo,
  });
}

export async function makeUserChoiceFromForm(
  prevState: unknown,
  formData: FormData,
  menuId: number,
): Promise<{ error: string | undefined }> {
  const dishId = formData.get("dish");
  if (!dishId) return { error: "Provide dish id" };
  const toGo = formData.get("togo");

  try {
    const tryUpdate = await updateUserChoice(menuId, Number(dishId), Boolean(toGo))
    if(!tryUpdate)
    {
      await makeUserChoice(menuId, Number(dishId), Boolean(toGo));
    }
    return { error: undefined };
  } catch (e) {
    console.error("[ERROR]: Failed to make user choice: ", e);
    return { error: "Something went wrong" };
  }
}