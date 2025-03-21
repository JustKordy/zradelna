"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { env } from "~/env";
import { db } from "../db";
import { userChoices } from "../db/schema";
import { z } from "zod";
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

// Menu
export async function makeUserChoice(
  menuId: number,
  dish: string,
  toGo = false,
  amount = 1,
) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  console.log(
    `[INFO]: Creating/Updating user choice: User: ${user.id} Menu: ${menuId}`,
  );
  console.log("JSEAIFEKGJNBKGFELAc ", dish);

  try {
    await db
      .insert(userChoices)
      .values({
        menuId,
        dish,
        toGo,
        amount,
        userId: user.id,
      })
      // Doing update if exists
      .onConflictDoUpdate({
        target: [userChoices.userId, userChoices.menuId],
        set: {
          dish,
          toGo,
          amount,
          updatedAt: new Date(),
        },
        where: and(
          eq(userChoices.userId, user.id),
          eq(userChoices.menuId, menuId),
        ),
      });
  } catch (error) {
    console.error("Failed to create/update user choice:", error);
    throw error;
  }
}

export async function removeUserChoice(menuID: number){

  const user = await getUser()
  if(!user) throw new Error("Unauthorized")

  console.log(
    `[INFO]: removing user choice: User: ${user.id} Menu: ${menuID}`,
  );
  try{
    await db.delete(userChoices).where(eq(userChoices.menuId, menuID))
  }catch(e){
    console.log("Failed to remove user choice: ", e)
  }
}

// Define a Zod schema for your form data
const UserChoiceFormSchema = z.object({
  dish: z.string().min(1, { message: "Dish is required" }),
  togo: z
    .any()
    .transform((val) => val === "on")
    .default(false),
  amount: z.coerce
    .number()
    .min(1, { message: "Amount must be greater than 0" })
    .default(1),
});

export async function makeUserChoiceFromForm(
  prevState: unknown,
  formData: FormData,
  menuId: number,
): Promise<{ error: string | undefined }> {
  try {
    // Parse the form data
    const parsedData = UserChoiceFormSchema.parse({
      dish: formData.get("dish"),
      togo: formData.get("togo"),
      amount: formData.get("amount"),
    });

    // Make the db call
    await makeUserChoice(
      menuId,
      parsedData.dish,
      parsedData.togo,
      parsedData.amount,
    );

    return { error: undefined };
  } catch (error) {
    console.error("[ERROR]: Failed to make user choice: ", error);
    if (error instanceof z.ZodError) {
      return { error: error.errors[0]!.message };
    }
    return { error: "Something went wrong" };
  }
}
