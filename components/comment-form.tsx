"use client";

import { useActionState, useEffect, useState } from "react";

import { CommentSubmitButton } from "@/components/comment-submit-button";
import { addComment, type CommentFormState } from "@/lib/actions/comments";

type CommentFormProps = Readonly<{
	postId: string;
	slug: string;
}>;

const initialState: CommentFormState = {
	success: false,
};

export function CommentForm({ postId, slug }: CommentFormProps) {
	const [state, formAction] = useActionState(addComment, initialState);

	const [authorName, setAuthorName] = useState("");
	const [body, setBody] = useState("");

	useEffect(() => {
		if (state.success) {
			setAuthorName("");
			setBody("");
			return;
		}

		if (state.values) {
			setAuthorName(state.values.authorName);
			setBody(state.values.body);
		}
	}, [state]);

	const authorError =
		state.fieldErrors?.authorName?.[0] && authorName.trim().length === 0
			? state.fieldErrors.authorName[0]
			: undefined;

	const bodyError =
		state.fieldErrors?.body?.[0] && body.trim().length < 10
			? state.fieldErrors.body[0]
			: undefined;

	return (
		<form action={formAction} className="comment-form" noValidate>
			<input type="hidden" name="postId" value={postId} />

			<input type="hidden" name="slug" value={slug} />

			<div className="comment-form__field">
				<label htmlFor="comment-author">Name</label>

				<input
					id="comment-author"
					name="authorName"
					type="text"
					value={authorName}
					maxLength={80}
					onChange={(event) => {
						setAuthorName(event.currentTarget.value);
					}}
					aria-invalid={authorError ? true : undefined}
					aria-describedby="comment-author-help"
				/>

				<div id="comment-author-help" className="comment-form__field-footer">
					{authorError ? (
						<p className="comment-form__error">{authorError}</p>
					) : (
						<span />
					)}

					<span
						className={
							authorName.length === 80
								? "comment-form__counter comment-form__counter--limit"
								: "comment-form__counter"
						}
					>
						{authorName.length} / 80
					</span>
				</div>
			</div>

			<div className="comment-form__field">
				<label htmlFor="comment-body">Comment</label>

				<textarea
					id="comment-body"
					name="body"
					rows={3}
					value={body}
					maxLength={2000}
					onChange={(event) => {
						setBody(event.currentTarget.value);
					}}
					aria-invalid={bodyError ? true : undefined}
					aria-describedby="comment-body-help"
				/>

				<div id="comment-body-help" className="comment-form__field-footer">
					{bodyError ? (
						<p className="comment-form__error">{bodyError}</p>
					) : (
						<span />
					)}

					<span
						className={
							body.length === 2000
								? "comment-form__counter comment-form__counter--limit"
								: "comment-form__counter"
						}
					>
						{body.length.toLocaleString()} / 2,000
					</span>
				</div>
			</div>

			<div className="comment-form__actions">
				<div aria-live="polite">
					{state.success && state.message && (
						<p className="comment-form__success">{state.message}</p>
					)}
				</div>

				<CommentSubmitButton />
			</div>
		</form>
	);
}
