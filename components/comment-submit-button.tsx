"use client";

import { useFormStatus } from "react-dom";

export function CommentSubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button type="submit" className="comment-submit-button" disabled={pending}>
			{pending ? "Posting..." : "Post comment"}
		</button>
	);
}
