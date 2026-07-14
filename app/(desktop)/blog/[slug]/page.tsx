import Link from "next/link";
import { notFound } from "next/navigation";

import { mockPosts } from "@/lib/mock-posts";

type BlogPostPageProps = Readonly<{
	params: Promise<{
		slug: string;
	}>;
}>;

const dateFormatter = new Intl.DateTimeFormat("en-PH", {
	year: "numeric",
	month: "long",
	day: "numeric",
});

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;

	const post = mockPosts.find((currentPost) => currentPost.slug === slug);

	if (!post) {
		notFound();
	}

	const formattedDate = dateFormatter.format(new Date(post.createdAt));

	return (
		<main className="desktop-area">
			<div className="desktop-icons">
				<Link href="/blog" className="desktop-icon">
					<span className="desktop-icon__image">📁</span>

					<span className="desktop-icon__label">All Posts</span>
				</Link>
			</div>

			<div className="window post-window">
				<div className="title-bar">
					<div className="title-bar-text">{post.title}</div>

					<div className="title-bar-controls">
						<button aria-label="Minimize" />

						<button aria-label="Maximize" />

						<Link href="/blog" aria-label="Close" className="close-button" />
					</div>
				</div>

				<div className="menu-bar">
					<button type="button">File</button>

					<button type="button">Edit</button>

					<button type="button">View</button>

					<button type="button">Help</button>
				</div>

				<div className="window-body">
					<header className="post-header">
						<p className="post-date">
							<time dateTime={post.createdAt}>{formattedDate}</time>
						</p>

						<h1>{post.title}</h1>

						<div className="post-tags">
							{post.tags.map((tag) => (
								<span key={tag}>#{tag}</span>
							))}
						</div>
					</header>

					<hr />

					<article className="post-content">
						<p>{post.body}</p>
					</article>

					<hr />

					<section className="comments-placeholder">
						<h2>Comments</h2>

						<p>Comments will appear here once the database is connected.</p>
					</section>
				</div>

				<div className="status-bar">
					<p className="status-bar-field">Post loaded successfully</p>

					<p className="status-bar-field">Chronicle</p>
				</div>
			</div>
		</main>
	);
}
