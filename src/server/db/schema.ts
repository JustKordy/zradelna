// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  date,
  index,
  integer,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `zradelna_${name}`);

export const dishes = createTable(
  "dishes",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    imgURL: varchar("img_url", { length: 512 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  }),
);

// Menu for a week
export const menus = createTable(
  "menus",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    from: date("from", { mode: "date" }).notNull(), // Should always be Monday

    mondayDish1: integer("monday_dish_1_id")
      .notNull()
      .references(() => dishes.id),
    mondayDish2: integer("monday_dish_2_id")
      .notNull()
      .references(() => dishes.id),

    tuesdayDish1: integer("tuesday_dish_1_id")
      .notNull()
      .references(() => dishes.id),
    tuesdayDish2: integer("tuesday_dish_2_id")
      .notNull()
      .references(() => dishes.id),

    wednesdayDish1: integer("wednesday_dish_1_id")
      .notNull()
      .references(() => dishes.id),
    wednesdayDish2: integer("wednesday_dish_2_id")
      .notNull()
      .references(() => dishes.id),

    thursdayDish1: integer("thursday_dish_1_id")
      .notNull()
      .references(() => dishes.id),
    thursdayDish2: integer("thursday_dish_2_id")
      .notNull()
      .references(() => dishes.id),

    fridayDish1: integer("friday_dish_1_id")
      .notNull()
      .references(() => dishes.id),
    fridayDish2: integer("friday_dish_2_id")
      .notNull()
      .references(() => dishes.id),
  },
  (table) => ({
    weekIndex: index("week_idx").on(table.from),
  }),
);

// User's choice for a week
export const userMenus = createTable(
  "user_tables",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: varchar("user_id", { length: 255 }).notNull(),

    monday: integer("monday_dish_id").references(() => dishes.id),
    tuesday: integer("tuesday_dish_id").references(() => dishes.id),
    wednesday: integer("wednesday_dish_id").references(() => dishes.id),
    thursday: integer("thursday_dish_id").references(() => dishes.id),
    friday: integer("friday_dish_id").references(() => dishes.id),
  },
  (table) => ({
    userIdIndex: index("user_id_idx").on(table.userId),
  }),
);
