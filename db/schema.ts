import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const jobs = pgTable('jobs', {
  id: varchar('id', { length: 255 }).primaryKey(),
  company: varchar('company', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});