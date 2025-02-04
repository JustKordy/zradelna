// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgTableCreator,
  primaryKey,
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
    isSoup: boolean("is_soup").default(false).notNull(),
    description: text("description"),
    imgURL: varchar("img_url", { length: 1024 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("name_idx").on(table.name),
    index("is_soup_idx").on(table.isSoup),
  ],
);

// Menu for a day
export const menus = createTable(
  "menus",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    date: date("date", { mode: "date" }).notNull(),
    soupId: integer("soup_id")
      .references(() => dishes.id)
      .notNull(),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("date_idx").on(table.date)],
).enableRLS();

// Define the join table for menus and dishes
export const menuDishes = createTable(
  "menu_dishes",
  {
    menuId: integer("menu_id")
      .notNull()
      .references(() => menus.id),
    dishId: integer("dish_id")
      .notNull()
      .references(() => dishes.id),
  },
  (table) => [primaryKey({ columns: [table.menuId, table.dishId] })],
);

export const menusR = relations(menus, ({ many, one }) => ({
  menusToDishes: many(menuDishes),
  userChoices: many(userChoices),
  soup: one(dishes, {
    fields: [menus.soupId],
    references: [dishes.id],
  }),
}));
export const dishesR = relations(dishes, ({ many }) => ({
  dishesToMenus: many(menuDishes),
  userChoices: many(userChoices),
  soups: many(menus),
}));
export const menuDishesR = relations(menuDishes, ({ one }) => ({
  menu: one(menus, {
    fields: [menuDishes.menuId],
    references: [menus.id],
  }),
  dishes: one(dishes, {
    fields: [menuDishes.dishId],
    references: [dishes.id],
  }),
}));

// User's choice
export const userChoices = createTable(
  "user_choice",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    menuId: integer("menu_id")
      .references(() => menus.id)
      .notNull(),
    dishId: integer("dish_id")
      .references(() => dishes.id)
      .notNull(),

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
  dish: one(dishes, {
    fields: [userChoices.dishId],
    references: [dishes.id],
  }),
  menu: one(menus, {
    fields: [userChoices.menuId],
    references: [menus.id],
  }),
}));
