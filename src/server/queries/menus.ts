"use server";

import { db } from "~/server/db";
import { menus, userChoices } from "~/server/db/schema";
import { between, eq } from "drizzle-orm";
import { getUser } from "./user";
import { z } from "zod";

// GET
export async function getMenu(date: Date) {
  return db.query.menus.findFirst({
    where: eq(menus.date, date),
  });
}

// Gets all menus in range
export async function getMenusInRange(from: Date, to: Date) {
  return db.query.menus.findMany({
    where: between(menus.date, from, to),
  });
}

// This fetches all menus in a range, but includes the choices user already made.
export async function getMenusInRangeWithUserSelect(from: Date, to: Date) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  return db.query.menus.findMany({
    where: between(menus.date, from, to),
    with: {
      menusToUserChoices: {
        where: eq(userChoices.userId, user.id),
      },
    },
  });
}

// CREATE
export async function createMenu(
  date: Date = new Date(),
  soup: string,
  dishes: string[],
) {
  const user = await getUser();
  if (user?.role !== "admin") throw new Error("Unauthorized");

  console.log(
    "[INFO][DB]: Creating a new menu: ",
    date.toISOString().split("T")[0],
  );
  return db.insert(menus).values({
    date,
    soup,
    dishes,
  });
}

const MenuFormSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
  soup: z.string().min(1, "Soup is required"),
  dishes: z
    .array(z.string().min(1, "Dish cannot be empty"))
    .min(1, "At least one dish is required"),
});

export type MenuFormData = z.infer<typeof MenuFormSchema>;

export async function createMenuAction(formData: FormData) {
  try {
    // Extract form data
    const date = formData.get("date") as string;
    const soup = formData.get("soup") as string;

    // Handle multiple dishes
    const dishesData = formData.getAll("dishes[]");
    const dishes = dishesData.filter((dish) => dish !== "") as string[];

    // Validate data
    const validatedData = MenuFormSchema.parse({
      date,
      soup,
      dishes,
    });

    // Create menu using the provided function
    await createMenu(
      new Date(validatedData.date),
      validatedData.soup,
      validatedData.dishes,
    );

    return { success: true, message: "Menu created successfully" };
  } catch (error) {
    console.error("Failed to create menu:", error);

    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .map((err) => `${err.path.toString()}: ${err.message}`)
        .join(", ");
      return {
        success: false,
        message: `Validation failed: ${errorMessages}`,
      };
    }

    return {
      success: false,
      message: "Failed to create menu. Please try again.",
    };
  }
}

export async function userChoice() {
  try {

    const userChoice = db.query.userChoices.findMany()

    return userChoice;
    
  } catch (error) {
    console.error('Faild to get user choice', error);
    return null;
  }
}
