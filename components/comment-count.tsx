import "server-only";

import { count, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { comments } from "@/lib/db/schema";

type CommentCountProps = Readonly<{
	postId: string;
}>;

export async function CommentCount({ postId }: CommentCountProps) {
	const [result] = await db
		.select({
			total: count(),
		})
		.from(comments)
		.where(eq(comments.postId, postId));

	const total = result?.total ?? 0;

	return (
		<span>
			{total} {total === 1 ? "comment" : "comments"}
		</span>
	);
}
