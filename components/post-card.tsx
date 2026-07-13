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
				compact ? "post-card grid sm:grid-cols-[180px_1fr]" : "post-card"
			}
		>
			<Image
				src={post.coverImage}
				alt=""
				width={1200}
				height={630}
				className={
					compact
						? "h-full min-h-40 w-full object-cover"
						: "aspect-[16/9] h-auto w-full object-cover"
				}
			/>

			<div className="p-4">
				<div className="post-card__meta flex flex-wrap justify-between gap-2">
					<time dateTime={post.createdAt}>{formattedDate}</time>

					<span>
						{post.commentCount}{" "}
						{post.commentCount === 1 ? "comment" : "comments"}
					</span>
				</div>

				<h2 className="site-heading mt-3 text-xl">
					<Link href={`/blog/${post.slug}`} className="site-link">
						{post.title}
					</Link>
				</h2>

				<p className="mt-3 leading-7">{post.excerpt}</p>

				<div className="mt-4 flex flex-wrap gap-2">
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

				<Link
					href={`/blog/${post.slug}`}
					className="site-link mt-4 inline-block font-bold"
				>
					Open entry →
				</Link>
			</div>
		</article>
	);
}
