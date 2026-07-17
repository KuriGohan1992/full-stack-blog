import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { AdminPostCardActions } from "@/components/admin-post-card-actions";
import { CommentCount } from "@/components/comment-count";
import type { posts } from "@/lib/db/schema";

type Post = typeof posts.$inferSelect;

type PostCardProps = Readonly<{
	post: Post;
	isAdmin?: boolean;
}>;

const FALLBACK_COVER_IMAGE = "/posts/placeholder.jpg";

function createExcerpt(body: string): string {
	const normalizedBody = body
		.replace(/[#>*_`~-]/g, "")
		.replace(/\s+/g, " ")
		.trim();

	return normalizedBody;
}

export function PostCard({ post, isAdmin = false }: PostCardProps) {
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(post.createdAt);

	const coverSource = post.coverImage || FALLBACK_COVER_IMAGE;
	const excerpt = createExcerpt(post.body);

	return (
		<article className="post-result grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)]">
			<div className="aspect-4/3 w-full overflow-hidden border border-black">
				<Image
					src={coverSource}
					alt={post.coverImage ? `Cover image for ${post.title}` : ""}
					width={800}
					height={600}
					className="h-full w-full object-cover"
				/>
			</div>

			<div className="relative min-w-0">
				{isAdmin && (
					<div className="mb-2 flex justify-end sm:absolute sm:top-0 sm:right-0 sm:mb-0">
						<AdminPostCardActions postId={post.id} />
					</div>
				)}

				<div className={isAdmin ? "sm:pr-36" : undefined}>
					<div className="post-card__meta flex flex-wrap items-center gap-1">
						<time dateTime={post.createdAt.toISOString()}>{formattedDate}</time>

						<span aria-hidden="true">·</span>

						<Suspense fallback={<span>Loading comments…</span>}>
							<CommentCount postId={post.id} />
						</Suspense>
					</div>

					<h2 className="site-heading mt-1 text-lg">
						<Link href={`/blog/${post.slug}`} className="site-link">
							{post.title}
						</Link>
					</h2>
				</div>

				<p className="post-card__excerpt mt-1 text-sm leading-5">{excerpt}</p>

				<div className="mt-2 flex flex-wrap gap-1">
					{[...post.tags].sort().map((tag) => (
						<Link
							key={tag}
							href={`/blog?tag=${encodeURIComponent(tag)}`}
							className="tag-link"
						>
							#{tag}
						</Link>
					))}
				</div>
			</div>
		</article>
	);
}
