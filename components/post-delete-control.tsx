"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { type DeletePostState, deletePost } from "@/lib/actions/posts";

type PostDeleteControlProps = Readonly<{
	postId: string;
}>;

const initialState: DeletePostState = {
	success: false,
};

export function PostDeleteControl({ postId }: PostDeleteControlProps) {
	const router = useRouter();
	const [isConfirming, setIsConfirming] = useState(false);

	const [state, formAction, isPending] = useActionState(
		deletePost,
		initialState,
	);

	useEffect(() => {
		if (!state.success) {
			return;
		}

		router.replace("/blog");
	}, [state.success, router]);

	if (!isConfirming) {
		return (
			<button
				type="button"
				className="post-menu__item post-menu__button"
				onClick={() => {
					setIsConfirming(true);
				}}
			>
				Delete
			</button>
		);
	}

	return (
		<form action={formAction} className="contents">
			<input type="hidden" name="postId" value={postId} />

			<span
				className="post-menu__item inline-flex items-center px-3 text-sm text-black"
				aria-live="polite"
			>
				Delete this post?
			</span>

			<button
				type="submit"
				disabled={isPending}
				className="post-menu__item post-menu__button"
			>
				{isPending ? "Deleting..." : "Yes"}
			</button>

			<button
				type="button"
				disabled={isPending}
				className="post-menu__item post-menu__button"
				onClick={() => {
					setIsConfirming(false);
				}}
			>
				No
			</button>

			{state.message && !state.success && (
				<span className="post-menu__item inline-flex items-center px-3 text-sm text-[#a00000]">
					{state.message}
				</span>
			)}
		</form>
	);
}
