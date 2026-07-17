import {
	toggleCommentApproval,
	toggleCommentAward,
} from "@/lib/actions/comments";
import {
	getApprovedCommentsByPostId,
	getCommentsByPostId,
} from "@/lib/db/queries";

type CommentListProps = Readonly<{
	postId: string;
	slug: string;
	isAdmin: boolean;
}>;

function formatCommentDate(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

export async function CommentList({ postId, slug, isAdmin }: CommentListProps) {
	const comments = isAdmin
		? await getCommentsByPostId(postId)
		: await getApprovedCommentsByPostId(postId);

	if (comments.length === 0) {
		return (
			<div className="comments-section__list">
				<p>No comments yet. Be the first to leave one.</p>
			</div>
		);
	}

	return (
		<div className="comments-section__list">
			{comments.map((comment) => (
				<article
					key={comment.id}
					className={
						comment.approved
							? "comment-entry"
							: "comment-entry comment-entry--hidden"
					}
				>
					<header className="comment-entry__header">
						<div>
							<span className="comment-entry__author">
								{comment.authorName}

								{comment.awarded && (
									<span
										className="ml-1 text-[#d4a000]"
										title="Awarded by the administrator"
									>
										<span aria-hidden="true">★</span>
										<span className="sr-only">
											Awarded by the administrator
										</span>
									</span>
								)}
							</span>

							<time
								dateTime={comment.createdAt.toISOString()}
								className="comment-entry__date"
							>
								{formatCommentDate(comment.createdAt)}
							</time>
						</div>

						{isAdmin && (
							<div className="flex gap-2">
								<form action={toggleCommentAward}>
									<input type="hidden" name="commentId" value={comment.id} />

									<input type="hidden" name="slug" value={slug} />

									<button type="submit" className="comment-moderation-button">
										{comment.awarded ? "Unstar" : "Star"}
									</button>
								</form>

								<form action={toggleCommentApproval}>
									<input type="hidden" name="commentId" value={comment.id} />

									<input type="hidden" name="slug" value={slug} />

									<button type="submit" className="comment-moderation-button">
										{comment.approved ? "Hide" : "Restore"}
									</button>
								</form>
							</div>
						)}
					</header>
					<p className="comment-entry__body">{comment.body}</p>
				</article>
			))}
		</div>
	);
}
