// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
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
  (table) => [index("name_idx").on(table.name)],
);

export const dishRelations = relations(dishes, ({ many }) => ({
  mondayOption1Menus: many(menus, { relationName: "monday_option1" }),
  mondayOption2Menus: many(menus, { relationName: "monday_option2" }),
  tuesdayOption1Menus: many(menus, { relationName: "tuesday_option1" }),
  tuesdayOption2Menus: many(menus, { relationName: "tuesday_option2" }),
  wednesdayOption1Menus: many(menus, { relationName: "wednesday_option1" }),
  wednesdayOption2Menus: many(menus, { relationName: "wednesday_option2" }),
  thursdayOption1Menus: many(menus, { relationName: "thursday_option1" }),
  thursdayOption2Menus: many(menus, { relationName: "thursday_option2" }),
  fridayOption1Menus: many(menus, { relationName: "friday_option1" }),
  fridayOption2Menus: many(menus, { relationName: "friday_option2" }),
}));

// Menu for a week
export const menus = createTable(
  "menus",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    fromDate: date("from_date").notNull(),

    // Monday options
    mondayOption1Id: integer("monday_option1_id").notNull(),
    mondayOption2Id: integer("monday_option2_id").notNull(),
    // Tuesday options
    tuesdayOption1Id: integer("tuesday_option1_id").notNull(),
    tuesdayOption2Id: integer("tuesday_option2_id").notNull(),
    // Wednesday options
    wednesdayOption1Id: integer("wednesday_option1_id").notNull(),
    wednesdayOption2Id: integer("wednesday_option2_id").notNull(),
    // Thursday options
    thursdayOption1Id: integer("thursday_option1_id").notNull(),
    thursdayOption2Id: integer("thursday_option2_id").notNull(),
    // Friday options
    fridayOption1Id: integer("friday_option1_id").notNull(),
    fridayOption2Id: integer("friday_option2_id").notNull(),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => [index("from_date_idx").on(table.fromDate)],
);

export const menuRelations = relations(menus, ({ one, many }) => ({
  userMenus: many(userMenus),
  mondayOption1: one(dishes, {
    // {{{
    fields: [menus.mondayOption1Id],
    references: [dishes.id],
    relationName: "monday_option1",
  }),
  mondayOption2: one(dishes, {
    fields: [menus.mondayOption2Id],
    references: [dishes.id],
    relationName: "monday_option2",
  }),
  tuesdayOption1: one(dishes, {
    fields: [menus.tuesdayOption1Id],
    references: [dishes.id],
    relationName: "tuesday_option1",
  }),
  tuesdayOption2: one(dishes, {
    fields: [menus.tuesdayOption2Id],
    references: [dishes.id],
    relationName: "tuesday_option2",
  }),
  wednesdayOption1: one(dishes, {
    fields: [menus.wednesdayOption1Id],
    references: [dishes.id],
    relationName: "wednesday_option1",
  }),
  wednesdayOption2: one(dishes, {
    fields: [menus.wednesdayOption2Id],
    references: [dishes.id],
    relationName: "wednesday_option2",
  }),
  thursdayOption1: one(dishes, {
    fields: [menus.thursdayOption1Id],
    references: [dishes.id],
    relationName: "thursday_option1",
  }),
  thursdayOption2: one(dishes, {
    fields: [menus.thursdayOption2Id],
    references: [dishes.id],
    relationName: "thursday_option2",
  }),
  fridayOption1: one(dishes, {
    fields: [menus.fridayOption1Id],
    references: [dishes.id],
    relationName: "friday_option1",
  }),
  fridayOption2: one(dishes, {
    fields: [menus.fridayOption2Id],
    references: [dishes.id],
    relationName: "friday_option2",
  }), // }}}
}));

// User's choice for a week
export const userMenus = createTable(
  "user_menus",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    menuId: integer("menu_id")
      .references(() => menus.id)
      .notNull(),

    monday: integer("monday_dish_id").references(() => dishes.id),
    tuesday: integer("tuesday_dish_id").references(() => dishes.id),
    wednesday: integer("wednesday_dish_id").references(() => dishes.id),
    thursday: integer("thursday_dish_id").references(() => dishes.id),
    friday: integer("friday_dish_id").references(() => dishes.id),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => [
    index("user_id_idx").on(table.userId),
    index("menu_id_idx").on(table.menuId),
  ],
);

export const userMenuRelations = relations(userMenus, ({ one }) => ({
  menu: one(menus, {
    // {{{
    fields: [userMenus.menuId],
    references: [menus.id],
  }),
  mondayDish: one(dishes, {
    fields: [userMenus.monday],
    references: [dishes.id],
  }),
  tuesdayDish: one(dishes, {
    fields: [userMenus.tuesday],
    references: [dishes.id],
  }),
  wednesdayDish: one(dishes, {
    fields: [userMenus.wednesday],
    references: [dishes.id],
  }),
  thursdayDish: one(dishes, {
    fields: [userMenus.thursday],
    references: [dishes.id],
  }),
  fridayDish: one(dishes, {
    fields: [userMenus.friday],
    references: [dishes.id],
  }),
})); // }}}
