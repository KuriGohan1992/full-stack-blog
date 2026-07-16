import Image from "next/image";
import { notFound } from "next/navigation";
import { CommentForm } from "@/components/comment-form";
import { CommentList } from "@/components/comment-list";
import { PostContent } from "@/components/post-content";
import { WindowControls } from "@/components/window-controls";
import { getApprovedCommentsByPostId, getPostBySlug } from "@/lib/db/queries";

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

	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const postComments = await getApprovedCommentsByPostId(post.id);
	const formattedDate = dateFormatter.format(post.createdAt);

	const isAdmin = false;

	return (
		<main className="desktop-area">
			<article className="window post-window">
				<div className="title-bar">
					<div className="title-bar-text">{post.title}</div>

					<WindowControls />
				</div>

				<nav className="post-menu" aria-label="Post actions">
					<a href="/blog" className="post-menu__item">
						Blogs
					</a>

					<a href="#post-content" className="post-menu__item">
						View
					</a>

					<a href="#comments" className="post-menu__item">
						Comment
					</a>

					<button type="button" className="post-menu__item" disabled={!isAdmin}>
						New
					</button>

					<button type="button" className="post-menu__item" disabled={!isAdmin}>
						Edit
					</button>

					<button type="button" className="post-menu__item" disabled={!isAdmin}>
						Delete
					</button>
				</nav>

				<div className="window-body post-window-body">
					<header className="post-header">
						<p className="post-date">
							<time dateTime={post.createdAt.toISOString()}>
								{formattedDate}
							</time>
						</p>

						<h1>{post.title}</h1>

						<p className="post-tags">
							{[...post.tags].sort().map((tag) => (
								<span key={tag}>#{tag}</span>
							))}
						</p>
					</header>

					{post.coverImage && (
						<div className="post-cover">
							<Image
								src={post.coverImage}
								alt={`Cover image for ${post.title}`}
								width={1200}
								height={900}
								className="post-cover__image"
								priority
							/>
						</div>
					)}
					<hr />

					<section id="post-content" className="post-content">
						<PostContent body={post.body} contentFormat={post.contentFormat} />
					</section>

					<hr />

					<section id="comments" className="comments-section">
						<h2>Comments</h2>

						<h3>Leave a comment</h3>

						<CommentForm postId={post.id} slug={post.slug} />

						<div className="comments-section__list">
							<CommentList comments={postComments} />
						</div>
					</section>
				</div>

				<footer className="status-bar post-status-bar">
					<p className="status-bar-field">
						Chronicle · Cham Mendez · © 1995 All rights reserved.
					</p>
				</footer>
			</article>
		</main>
	);
}
