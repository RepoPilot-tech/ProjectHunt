import { Message } from "ai";
import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable("Chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  messages: json("messages").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
});

export type Chat = Omit<InferSelectModel<typeof chat>, "messages"> & {
  messages: Array<Message>;
};

export const reservation = pgTable("Reservation", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  details: json("details").notNull(),
  hasCompletedPayment: boolean("hasCompletedPayment").notNull().default(false),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
});

export type Reservation = InferSelectModel<typeof reservation>;

export const project = pgTable("Project", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),  
  name: varchar("name", { length: 255 }).notNull(), 
  creatorName: varchar("creatorName", { length: 255 }).notNull(),
  websiteLink: varchar("websiteLink", { length: 255 }).notNull(), 
  description: varchar("description", { length: 1000 }).notNull(),
  createdAt: timestamp("createdAt").notNull(), 
  userId: uuid("userId").notNull().references(() => user.id), 
  spaceId: uuid("spaceId").references(() => space.id),
});
export type Project = InferSelectModel<typeof project>;

export const space = pgTable("Spaces", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(), 
  icon: varchar("icon", { length: 255 }).notNull(), 
  createdAt: timestamp("createdAt").notNull(),  
  userId: uuid("userId").notNull().references(() => user.id),
});

export type Spaces = InferSelectModel<typeof space>;