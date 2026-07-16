import "server-only";

import { and, arrayContains, count, desc, eq, ilike, or } from "drizzle-orm";

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

const DEFAULT_POSTS_PER_PAGE = 4;

type GetPostsOptions = Readonly<{
	query?: string;
	tags?: string[];
	page?: number;
	postsPerPage?: number;
}>;

export async function getRecentPosts(limit = 4) {
	return db.select().from(posts).orderBy(desc(posts.createdAt)).limit(limit);
}

export async function getAvailableTags() {
	const rows = await db
		.select({
			tags: posts.tags,
		})
		.from(posts);

	return [...new Set(rows.flatMap((row) => row.tags))].sort();
}

export async function getPostBySlug(slug: string) {
	const [post] = await db
		.select()
		.from(posts)
		.where(eq(posts.slug, slug))
		.limit(1);

	return post;
}

export async function getPosts({
	query = "",
	tags = [],
	page = 1,
	postsPerPage = DEFAULT_POSTS_PER_PAGE,
}: GetPostsOptions = {}) {
	const normalizedQuery = query.trim();

	const conditions = [];

	if (normalizedQuery.length > 0) {
		conditions.push(
			or(
				ilike(posts.title, `%${normalizedQuery}%`),
				ilike(posts.body, `%${normalizedQuery}%`),
			),
		);
	}

	for (const tag of tags) {
		conditions.push(arrayContains(posts.tags, [tag]));
	}

	const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

	const safePage = Number.isInteger(page) && page > 0 ? page : 1;

	const offset = (safePage - 1) * postsPerPage;

	const [rows, totalResult] = await Promise.all([
		db
			.select()
			.from(posts)
			.where(whereClause)
			.orderBy(desc(posts.createdAt))
			.limit(postsPerPage)
			.offset(offset),

		db
			.select({
				total: count(),
			})
			.from(posts)
			.where(whereClause),
	]);

	const totalPosts = totalResult[0]?.total ?? 0;

	const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

	return {
		posts: rows,
		totalPosts,
		totalPages,
		currentPage: Math.min(safePage, totalPages),
	};
}
