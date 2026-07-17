"use client";

import { useActionState, useEffect, useState } from "react";

import { PostContent } from "@/components/post-content";
import {
	createPost,
	type PostFormState,
	type PostFormValues,
	updatePost,
} from "@/lib/actions/posts";

type AdminPostFormProps = Readonly<{
	mode: "create" | "edit";
	postId?: string;
	initialValues?: PostFormValues;
}>;

const emptyValues: PostFormValues = {
	title: "",
	slug: "",
	body: "",
	coverImage: "",
	contentFormat: "plain",
	tags: "",
};

const initialState: PostFormState = {
	success: false,
};

function createSlug(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/['"]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function AdminPostForm({
	mode,
	postId,
	initialValues = emptyValues,
}: AdminPostFormProps) {
	const serverAction = mode === "create" ? createPost : updatePost;

	const [state, formAction, isPending] = useActionState(
		serverAction,
		initialState,
	);

	const [title, setTitle] = useState(initialValues.title);
	const [slug, setSlug] = useState(initialValues.slug);
	const [body, setBody] = useState(initialValues.body);
	const [coverImage, setCoverImage] = useState(initialValues.coverImage);
	const [contentFormat, setContentFormat] = useState<"plain" | "markdown">(
		initialValues.contentFormat,
	);
	const [tags, setTags] = useState(initialValues.tags);
	const [showPreview, setShowPreview] = useState(false);
	const [slugWasEdited, setSlugWasEdited] = useState(mode === "edit");

	useEffect(() => {
		if (!state.values) {
			return;
		}

		setTitle(state.values.title);
		setSlug(state.values.slug);
		setBody(state.values.body);
		setCoverImage(state.values.coverImage);
		setContentFormat(state.values.contentFormat);
		setTags(state.values.tags);
	}, [state.values]);

	const titleError = state.fieldErrors?.title?.[0];
	const slugError = state.fieldErrors?.slug?.[0];
	const bodyError = state.fieldErrors?.body?.[0];
	const coverImageError = state.fieldErrors?.coverImage?.[0];
	const contentFormatError = state.fieldErrors?.contentFormat?.[0];
	const tagsError = state.fieldErrors?.tags?.[0];

	return (
		<form action={formAction} className="grid gap-2" noValidate>
			{mode === "edit" && postId && (
				<input type="hidden" name="postId" value={postId} />
			)}

			<div className="comment-form__field">
				<label htmlFor="post-title">Title</label>

				<input
					id="post-title"
					name="title"
					type="text"
					value={title}
					maxLength={150}
					disabled={isPending}
					aria-invalid={titleError ? true : undefined}
					aria-describedby="post-title-help"
					onChange={(event) => {
						const nextTitle = event.currentTarget.value;

						setTitle(nextTitle);

						if (!slugWasEdited) {
							setSlug(createSlug(nextTitle));
						}
					}}
				/>

				<div id="post-title-help" className="comment-form__field-footer">
					{titleError ? (
						<p className="comment-form__error">{titleError}</p>
					) : (
						<span />
					)}

					<span
						className={
							title.length === 150
								? "comment-form__counter comment-form__counter--limit"
								: "comment-form__counter"
						}
					>
						{title.length} / 150
					</span>
				</div>
			</div>

			<div className="comment-form__field">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<label htmlFor="post-slug">Slug</label>

					<button
						type="button"
						disabled={isPending}
						onClick={() => {
							setSlug(createSlug(title));
							setSlugWasEdited(false);
						}}
						className="border-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] px-3 py-1 font-['Pixelated_MS_Sans_Serif',Arial,sans-serif] text-sm text-black hover:bg-[#d4d0c8] active:border-t-[#404040] active:border-r-white active:border-b-white active:border-l-[#404040] disabled:text-[#808080]"
					>
						Regenerate
					</button>
				</div>

				<input
					id="post-slug"
					name="slug"
					type="text"
					value={slug}
					maxLength={160}
					disabled={isPending}
					spellCheck={false}
					aria-invalid={slugError ? true : undefined}
					aria-describedby="post-slug-help"
					onChange={(event) => {
						setSlug(event.currentTarget.value);
						setSlugWasEdited(true);
					}}
				/>

				<div id="post-slug-help" className="comment-form__field-footer">
					{slugError ? <p className="comment-form__error">{slugError}</p> : ""}

					<span
						className={
							slug.length === 160
								? "comment-form__counter comment-form__counter--limit"
								: "comment-form__counter"
						}
					>
						{slug.length} / 160
					</span>
				</div>
			</div>

			<div className="comment-form__field ">
				<label htmlFor="post-cover-image">Cover image path (Optional)</label>

				<input
					id="post-cover-image"
					name="coverImage"
					type="text"
					value={coverImage}
					maxLength={500}
					disabled={isPending}
					placeholder="/posts/example.jpg"
					aria-invalid={coverImageError ? true : undefined}
					aria-describedby="post-cover-image-help"
					onChange={(event) => {
						setCoverImage(event.currentTarget.value);
					}}
				/>

				<div id="post-cover-image-help" className="comment-form__field-footer">
					{coverImageError ? (
						<p className="comment-form__error">{coverImageError}</p>
					) : (
						<p className="text-sm text-[#555]"></p>
					)}

					<span
						className={
							coverImage.length === 500
								? "comment-form__counter comment-form__counter--limit"
								: "comment-form__counter"
						}
					>
						{coverImage.length} / 500
					</span>
				</div>
			</div>

			<div className="comment-form__field">
				<label htmlFor="post-tags">Tags</label>

				<input
					id="post-tags"
					name="tags"
					type="text"
					value={tags}
					maxLength={500}
					disabled={isPending}
					placeholder="personal, philosophy, reflection"
					aria-invalid={tagsError ? true : undefined}
					aria-describedby="post-tags-help"
					onChange={(event) => {
						setTags(event.currentTarget.value);
					}}
				/>

				<div id="post-tags-help" className="comment-form__field-footer">
					{tagsError ? (
						<p className="comment-form__error">{tagsError}</p>
					) : (
						<p className="m-0 text-sm text-[#555]">
							Separate multiple tags with commas.
						</p>
					)}

					<span
						className={
							tags.length === 500
								? "comment-form__counter comment-form__counter--limit"
								: "comment-form__counter"
						}
					>
						{tags.length} / 500
					</span>
				</div>
			</div>

			<div className="flex items-center gap-3 border-y border-[#808080] py-2">
				<span className="text-base font-bold text-black">
					Render as Markdown
				</span>

				<label
					htmlFor="post-markdown-toggle"
					className="relative inline-flex h-6 w-12 cursor-pointer items-center"
				>
					<input
						id="post-markdown-toggle"
						name="contentFormatToggle"
						type="checkbox"
						checked={contentFormat === "markdown"}
						disabled={isPending}
						onChange={(event) => {
							setContentFormat(
								event.currentTarget.checked ? "markdown" : "plain",
							);
						}}
						className="peer sr-only"
					/>

					<span className="absolute inset-0 border-2 border-t-[#404040] border-r-white border-b-white border-l-[#404040] bg-[#808080] peer-checked:bg-[#000080] peer-disabled:opacity-60" />

					<span className="absolute left-1 top-1 h-4 w-4 border-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] transition-transform peer-checked:translate-x-6" />
				</label>

				<input type="hidden" name="contentFormat" value={contentFormat} />

				{contentFormatError && (
					<p className="m-0 text-sm text-[#a00000]">{contentFormatError}</p>
				)}
			</div>
			<div className="comment-form__field">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<label htmlFor="post-body">Post content</label>

					<div className="flex">
						<button
							type="button"
							aria-pressed={!showPreview}
							onClick={() => {
								setShowPreview(false);
							}}
							className={
								showPreview
									? "inline-flex min-w-20 items-center justify-center border-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] px-3 py-1 font-['Pixelated_MS_Sans_Serif',Arial,sans-serif] text-sm text-black hover:bg-[#d4d0c8] active:border-t-[#404040] active:border-r-white active:border-b-white active:border-l-[#404040]"
									: "inline-flex min-w-20 items-center justify-center border-2 border-t-[#404040] border-r-white border-b-white border-l-[#404040] bg-[#a8a8a8] px-3 py-1 font-['Pixelated_MS_Sans_Serif',Arial,sans-serif] text-sm text-black"
							}
						>
							Edit
						</button>

						<button
							type="button"
							aria-pressed={showPreview}
							onClick={() => {
								setShowPreview(true);
							}}
							className={
								showPreview
									? "border-2 border-t-[#404040] border-r-white border-b-white border-l-[#404040] bg-[#a8a8a8] px-4 py-1 text-sm text-black"
									: "border-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] px-4 py-1 text-sm text-black"
							}
						>
							Preview
						</button>
					</div>
				</div>

				{showPreview ? (
					<div className="min-h-80 overflow-auto border-2 border-t-[#404040] border-r-white border-b-white border-l-[#404040] bg-white p-4 text-black">
						{body.trim() ? (
							<PostContent body={body} contentFormat={contentFormat} />
						) : (
							<p>Nothing to preview yet.</p>
						)}
					</div>
				) : (
					<textarea
						id="post-body"
						name="body"
						rows={12}
						value={body}
						maxLength={50_000}
						disabled={isPending}
						aria-invalid={bodyError ? true : undefined}
						aria-describedby="post-body-help"
						onChange={(event) => {
							setBody(event.currentTarget.value);
						}}
						className="min-h-64"
					/>
				)}

				{showPreview && <input type="hidden" name="body" value={body} />}

				<div id="post-body-help" className="comment-form__field-footer">
					{bodyError ? (
						<p className="comment-form__error">{bodyError}</p>
					) : (
						<span />
					)}

					<span
						className={
							body.length === 50_000
								? "comment-form__counter comment-form__counter--limit"
								: "comment-form__counter"
						}
					>
						{body.length.toLocaleString()} / 50,000
					</span>
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#808080] pt-4">
				{state.message && !state.success ? (
					<p className="m-0 text-sm text-[#a00000]">{state.message}</p>
				) : (
					<span />
				)}

				<button
					type="submit"
					disabled={isPending}
					className="comment-submit-button"
				>
					{isPending
						? mode === "create"
							? "Creating..."
							: "Saving..."
						: mode === "create"
							? "Create post"
							: "Save changes"}
				</button>
			</div>
		</form>
	);
}
