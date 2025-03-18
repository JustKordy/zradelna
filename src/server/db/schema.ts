// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgSchema,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const appSchema = pgSchema("app");

export const createTable = pgTableCreator((name) => `zradelna_${name}`);

// Menu for a day
export const menus = createTable(
  "menus",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    date: date("date", { mode: "date" }).unique().notNull(),
    soup: varchar("soup", { length: 255 }).notNull(),
    options: varchar("options", { length: 255 }).array().notNull(),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("date_idx").on(table.date)],
);

// User's choice
export const userChoices = createTable(
  "user_choice",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    menuId: integer("menu_id").notNull(),
    dish: varchar("dish", { length: 255 }).notNull(),
    toGo: boolean("to_go").default(false).notNull(),
    amount: integer("amount").default(1).notNull(),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("user_id_idx").on(table.userId),
    index("menu_id_idx").on(table.menuId),
  ],
);

export const userChoiceR = relations(userChoices, ({ one }) => ({
  menu: one(menus, {
    fields: [userChoices.menuId],
    references: [menus.id],
  }),
}));
