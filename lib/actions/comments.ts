"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { comments, posts } from "@/lib/db/schema";

const addCommentSchema = z.object({
	postId: z.string().uuid("Invalid post"),
	slug: z.string().trim().min(1, "Invalid post"),
	authorName: z
		.string()
		.trim()
		.min(1, "Your name is required")
		.max(80, "Your name must be a maximum of 80 characters"),
	body: z
		.string()
		.trim()
		.min(10, "Your comment must contain at least 10 characters")
		.max(2000, "Your comment must be a maximum of 2,000 characters"),
});

export type CommentFormState = Readonly<{
	success: boolean;
	message?: string;
	fieldErrors?: Readonly<{
		authorName?: string[];
		body?: string[];
	}>;
	values?: Readonly<{
		authorName: string;
		body: string;
	}>;
}>;

export async function addComment(
	_previousState: CommentFormState,
	formData: FormData,
): Promise<CommentFormState> {
	const rawAuthorName = formData.get("authorName");
	const rawBody = formData.get("body");
	const parsed = addCommentSchema.safeParse({
		postId: formData.get("postId"),
		slug: formData.get("slug"),
		authorName: rawAuthorName,
		body: rawBody,
	});

	if (!parsed.success) {
		const fieldErrors = parsed.error.flatten().fieldErrors;

		return {
			success: false,
			fieldErrors: {
				authorName: fieldErrors.authorName,
				body: fieldErrors.body,
			},
			values: {
				authorName: typeof rawAuthorName === "string" ? rawAuthorName : "",
				body: typeof rawBody === "string" ? rawBody : "",
			},
		};
	}
	const { postId, slug, authorName, body } = parsed.data;

	const [existingPost] = await db
		.select({
			id: posts.id,
			slug: posts.slug,
		})
		.from(posts)
		.where(eq(posts.id, postId))
		.limit(1);

	if (!existingPost || existingPost.slug !== slug) {
		return {
			success: false,
			message: "The selected blog post no longer exists.",
		};
	}

	await db.insert(comments).values({
		postId,
		authorName,
		body,
		approved: true,
	});

	revalidatePath(`/blog/${slug}`);
	revalidatePath("/blog");
	revalidatePath("/");

	return {
		success: true,
		message: "Your comment was posted successfully.",
	};
}
