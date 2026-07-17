import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
	id: uuid("id").primaryKey().defaultRandom(),

	title: text("title").notNull(),

	slug: text("slug").notNull().unique(),

	body: text("body").notNull(),

	coverImage: text("cover_image"),

	contentFormat: text("content_format")
		.$type<"plain" | "markdown">()
		.default("plain")
		.notNull(),

	tags: text("tags").array().default([]).notNull(),

	createdAt: timestamp("created_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),

	updatedAt: timestamp("updated_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
});

export const comments = pgTable("comments", {
	id: uuid("id").primaryKey().defaultRandom(),

	postId: uuid("post_id")
		.references(() => posts.id, {
			onDelete: "cascade",
		})
		.notNull(),

	authorName: text("author_name").notNull(),

	body: text("body").notNull(),

	approved: boolean("approved").default(true).notNull(),

	awarded: boolean("awarded").default(false).notNull(),

	createdAt: timestamp("created_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
});

export const postsRelations = relations(posts, ({ many }) => ({
	comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id],
	}),
}));
