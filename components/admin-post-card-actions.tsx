"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { type DeletePostState, deletePost } from "@/lib/actions/posts";

type AdminPostCardActionsProps = Readonly<{
	postId: string;
}>;

const initialState: DeletePostState = {
	success: false,
};

export function AdminPostCardActions({ postId }: AdminPostCardActionsProps) {
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

		setIsConfirming(false);
		router.refresh();
	}, [state.success, router]);

	if (isConfirming) {
		return (
			<form
				action={formAction}
				className="flex flex-wrap items-center justify-end gap-1"
			>
				<input type="hidden" name="postId" value={postId} />

				<span className="mr-1 text-sm text-black">Delete?</span>

				<button
					type="submit"
					disabled={isPending}
					className="win98-button min-w-14"
				>
					{isPending ? "..." : "Yes"}
				</button>

				<button
					type="button"
					disabled={isPending}
					onClick={() => {
						setIsConfirming(false);
					}}
					className="win98-button min-w-14"
				>
					No
				</button>

				{state.message && !state.success && (
					<p className="basis-full text-right text-sm text-[#a00000]">
						{state.message}
					</p>
				)}
			</form>
		);
	}

	return (
		<div className="flex justify-end gap-1">
			<Link href={`/edit/${postId}`} className="win98-button min-w-16">
				Edit
			</Link>

			<button
				type="button"
				onClick={() => {
					setIsConfirming(true);
				}}
				className="win98-button min-w-16"
			>
				Delete
			</button>
		</div>
	);
}
