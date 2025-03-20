// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
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

export const menus = createTable(
  "menus",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    date: date("date", { mode: "date" }).unique().notNull(),
    soup: varchar("soup", { length: 255 }).notNull(),
    dishes: varchar("dishes", { length: 255 }).array().notNull(),

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

export const userChoices = createTable("user_choices", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  userId: varchar("user_id", {length: 128}).notNull(),
  menuId: integer("menu_id").references(() => menus.id).notNull(),
  dish: varchar("dish", {length: 255}).notNull(),
  amount: integer("amount").default(1).notNull(),
  
  createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
      .$onUpdate(() => new Date()),

}, (table) => [index("user_id_idx").on(table.userId), index("menu_id_idx").on(table.menuId)] )


export const userChoicesR = relations(userChoices, ({one}) => ({
  userChoicesToMenus: one(menus, {
    fields: [userChoices.menuId],
    references: [menus.id],
  })
}))

export const menusR = relations(userChoices, ({many}) => ({
  userChoicesToMenus: many(userChoices)
}))