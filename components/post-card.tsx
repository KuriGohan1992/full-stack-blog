import Image from "next/image";
import Link from "next/link";

import type { MockPost } from "@/lib/mock-posts";

type PostCardProps = Readonly<{
	post: MockPost;
	compact?: boolean;
}>;

const dateFormatter = new Intl.DateTimeFormat("en-PH", {
	dateStyle: "medium",
});

export function PostCard({ post, compact = false }: PostCardProps) {
	const formattedDate = dateFormatter.format(new Date(post.createdAt));

	return (
		<article
			className={
				compact
					? "post-result grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)]"
					: "post-result grid gap-4 sm:grid-cols-[240px_minmax(0,1fr)]"
			}
		>
			<Image
				src={post.coverImage}
				alt=""
				width={1200}
				height={675}
				className="aspect-video h-auto w-full object-cover"
			/>

			<div className="min-w-0">
				<div className="post-card__meta">
					<time dateTime={post.createdAt}>{formattedDate}</time>
				</div>

				<h2
					className={
						compact ? "site-heading mt-1 text-lg" : "site-heading mt-1 text-xl"
					}
				>
					<Link href={`/blog/${post.slug}`} className="site-link">
						{post.title}
					</Link>
				</h2>

				<p className="mt-1 text-sm leading-5">{post.excerpt}</p>

				<div className="mt-2 flex flex-wrap gap-1">
					{post.tags.map((tag) => (
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
