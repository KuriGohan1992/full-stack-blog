"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { isAdmin } from "@/lib/auth/admin-session";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

const postSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "Title is required.")
		.max(150, "Title must be 150 characters or fewer."),

	slug: z
		.string()
		.trim()
		.min(1, "Slug is required.")
		.max(160, "Slug must be 160 characters or fewer.")
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			"Use lowercase letters, numbers, and single hyphens only.",
		),

	body: z
		.string()
		.trim()
		.min(1, "Post content is required.")
		.max(50_000, "Post content must be 50,000 characters or fewer."),

	coverImage: z
		.string()
		.trim()
		.max(500, "Cover-image path must be 500 characters or fewer."),

	contentFormat: z.enum(["plain", "markdown"], {
		message: "Choose plain text or Markdown.",
	}),

	tags: z.string().trim().max(500, "The combined tag value is too long."),
});

export type DeletePostState = Readonly<{
	success: boolean;
	message?: string;
}>;

export type PostFormValues = Readonly<{
	title: string;
	slug: string;
	body: string;
	coverImage: string;
	contentFormat: "plain" | "markdown";
	tags: string;
}>;

export type PostFormFieldErrors = Partial<
	Record<keyof PostFormValues, string[]>
>;

export type PostFormState = Readonly<{
	success: boolean;
	message?: string;
	fieldErrors?: PostFormFieldErrors;
	values?: PostFormValues;
}>;

function readPostFormValues(formData: FormData): PostFormValues {
	return {
		title: String(formData.get("title") ?? ""),
		slug: String(formData.get("slug") ?? ""),
		body: String(formData.get("body") ?? ""),
		coverImage: String(formData.get("coverImage") ?? ""),
		contentFormat:
			formData.get("contentFormat") === "markdown" ? "markdown" : "plain",
		tags: String(formData.get("tags") ?? ""),
	};
}

function normalizeTags(tagsValue: string): string[] {
	return [
		...new Set(
			tagsValue
				.split(",")
				.map((tag) => tag.trim().toLowerCase())
				.filter((tag) => tag.length > 0),
		),
	].sort();
}

async function requireAdmin(): Promise<void> {
	if (!(await isAdmin())) {
		throw new Error("Unauthorized administrator action.");
	}
}

async function slugAlreadyExists(
	slug: string,
	excludedPostId?: string,
): Promise<boolean> {
	const condition = excludedPostId
		? and(eq(posts.slug, slug), ne(posts.id, excludedPostId))
		: eq(posts.slug, slug);

	const [existingPost] = await db
		.select({
			id: posts.id,
		})
		.from(posts)
		.where(condition)
		.limit(1);

	return Boolean(existingPost);
}

function validationFailure(
	values: PostFormValues,
	fieldErrors: PostFormFieldErrors,
): PostFormState {
	return {
		success: false,
		message: "Please correct the highlighted fields.",
		fieldErrors,
		values,
	};
}

export async function createPost(
	_previousState: PostFormState,
	formData: FormData,
): Promise<PostFormState> {
	await requireAdmin();

	const values = readPostFormValues(formData);

	const parsed = postSchema.safeParse(values);

	if (!parsed.success) {
		return validationFailure(values, parsed.error.flatten().fieldErrors);
	}

	if (await slugAlreadyExists(parsed.data.slug)) {
		return validationFailure(values, {
			slug: ["A post already uses this slug."],
		});
	}

	const [createdPost] = await db
		.insert(posts)
		.values({
			title: parsed.data.title,
			slug: parsed.data.slug,
			body: parsed.data.body,
			coverImage:
				parsed.data.coverImage.length > 0 ? parsed.data.coverImage : null,
			contentFormat: parsed.data.contentFormat,
			tags: normalizeTags(parsed.data.tags),
		})
		.returning({
			slug: posts.slug,
		});

	if (!createdPost) {
		throw new Error("The post could not be created.");
	}

	revalidatePath("/");
	revalidatePath("/blog");

	redirect(`/blog/${createdPost.slug}`);
}

export async function updatePost(
	_previousState: PostFormState,
	formData: FormData,
): Promise<PostFormState> {
	await requireAdmin();

	const postId = String(formData.get("postId") ?? "");

	const validPostId = z.string().uuid().safeParse(postId);

	if (!validPostId.success) {
		throw new Error("Invalid post identifier.");
	}

	const values = readPostFormValues(formData);

	const parsed = postSchema.safeParse(values);

	if (!parsed.success) {
		return validationFailure(values, parsed.error.flatten().fieldErrors);
	}

	const [currentPost] = await db
		.select({
			id: posts.id,
			slug: posts.slug,
		})
		.from(posts)
		.where(eq(posts.id, postId))
		.limit(1);

	if (!currentPost) {
		throw new Error("The post being edited no longer exists.");
	}

	if (await slugAlreadyExists(parsed.data.slug, postId)) {
		return validationFailure(values, {
			slug: ["A different post already uses this slug."],
		});
	}

	await db
		.update(posts)
		.set({
			title: parsed.data.title,
			slug: parsed.data.slug,
			body: parsed.data.body,
			coverImage:
				parsed.data.coverImage.length > 0 ? parsed.data.coverImage : null,
			contentFormat: parsed.data.contentFormat,
			tags: normalizeTags(parsed.data.tags),
			updatedAt: new Date(),
		})
		.where(eq(posts.id, postId));

	revalidatePath("/");
	revalidatePath("/blog");
	revalidatePath(`/blog/${currentPost.slug}`);
	revalidatePath(`/blog/${parsed.data.slug}`);

	redirect(`/blog/${parsed.data.slug}`);
}

export async function deletePost(
	_previousState: DeletePostState,
	formData: FormData,
): Promise<DeletePostState> {
	await requireAdmin();

	const postId = String(formData.get("postId") ?? "");

	const validPostId = z.string().uuid().safeParse(postId);

	if (!validPostId.success) {
		return {
			success: false,
			message: "Invalid post identifier.",
		};
	}

	const [deletedPost] = await db
		.delete(posts)
		.where(eq(posts.id, postId))
		.returning({
			slug: posts.slug,
		});

	if (!deletedPost) {
		return {
			success: false,
			message: "The post could not be found.",
		};
	}

	revalidatePath("/");
	revalidatePath("/blog");
	revalidatePath(`/blog/${deletedPost.slug}`);

	return {
		success: true,
	};
}
