import type { comments } from "@/lib/db/schema";

type Comment = typeof comments.$inferSelect;

type CommentListProps = Readonly<{
	comments: Comment[];
}>;

const dateFormatter = new Intl.DateTimeFormat("en-PH", {
	dateStyle: "medium",
	timeStyle: "short",
});

export function CommentList({ comments }: CommentListProps) {
	if (comments.length === 0) {
		return (
			<p className="comments-empty">
				No comments yet. Be the first to leave one.
			</p>
		);
	}

	return (
		<div className="comment-list">
			{comments.map((comment) => (
				<article key={comment.id} className="comment">
					<header className="comment__header">
						<strong className="comment__author">{comment.authorName}</strong>

						<time
							className="comment__date"
							dateTime={comment.createdAt.toISOString()}
						>
							{dateFormatter.format(comment.createdAt)}
						</time>
					</header>

					<p className="comment__body">{comment.body}</p>
				</article>
			))}
		</div>
	);
}
