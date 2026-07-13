import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { mockPosts } from "@/lib/mock-posts";

type BlogPostPageProps = Readonly<{
	params: Promise<{
		slug: string;
	}>;
}>;

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;

	const post = mockPosts.find((candidatePost) => candidatePost.slug === slug);

	if (!post) {
		return {
			title: "Entry not found",
		};
	}

	return {
		title: post.title,
		description: post.excerpt,
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;

	const post = mockPosts.find((candidatePost) => candidatePost.slug === slug);

	if (!post) {
		notFound();
	}

	return (
		<main className="mx-auto max-w-5xl py-8">
			<article className="desktop-window">
				<header className="desktop-title-bar">
					<span>{post.title} - Chronicle</span>

					<div className="flex gap-1">
						<span className="desktop-window-button" aria-hidden="true">
							_
						</span>

						<span className="desktop-window-button" aria-hidden="true">
							□
						</span>

						<span className="desktop-window-button" aria-hidden="true">
							×
						</span>
					</div>
				</header>

				<div className="p-5 sm:p-8">
					<p className="font-mono text-sm">Individual post desktop interface</p>

					<h1 className="mt-4 text-3xl font-bold">{post.title}</h1>

					<p className="mt-4 leading-7">{post.body}</p>

					<section className="mt-8 border-2 border-gray-700 bg-white p-4">
						<h2 className="text-xl font-bold">Comments</h2>

						<p className="mt-2">
							The real comment list and form will be connected after the
							database schema.
						</p>
					</section>

					<Link href="/blog" className="mt-6 inline-block font-bold underline">
						← Return to the archive
					</Link>
				</div>
			</article>
		</main>
	);
}
