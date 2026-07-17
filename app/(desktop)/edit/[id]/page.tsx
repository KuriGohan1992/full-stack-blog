import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { AdminPostForm } from "@/components/admin-post-form";
import { BackButton } from "@/components/back-button";
import { WindowControls } from "@/components/window-controls";
import { isAdmin } from "@/lib/auth/admin-session";
import { getPostById } from "@/lib/db/queries";

export const metadata: Metadata = {
	title: "Edit Post",
	description: "Edit an existing Chronicle post.",
};

type EditPostPageProps = Readonly<{
	params: Promise<{
		id: string;
	}>;
}>;

export default function EditPostPage({ params }: EditPostPageProps) {
	return (
		<Suspense fallback={<EditPostLoading />}>
			<EditPostContent params={params} />
		</Suspense>
	);
}

async function EditPostContent({ params }: EditPostPageProps) {
	const admin = await isAdmin();

	if (!admin) {
		redirect("/");
	}

	const { id } = await params;
	const post = await getPostById(id);

	if (!post) {
		notFound();
	}

	return (
		<main className="desktop-area">
			<section className="window post-window">
				<div className="title-bar">
					<div className="title-bar-text">Edit Blog Post</div>
					<WindowControls />
				</div>

				<div className="window-body post-window-body">
					<BackButton />

					<header className="mb-2 border-b border-[#808080] pb-3">
						<h2 className="mt-2 mb-0 text-4xl font-normal text-black">
							Edit post
						</h2>

						<p className="mt-1 text-sm text-[#555]">
							Update the fields below and save your changes.
						</p>
					</header>

					<AdminPostForm
						mode="edit"
						postId={post.id}
						initialValues={{
							title: post.title,
							slug: post.slug,
							body: post.body,
							coverImage: post.coverImage ?? "",
							contentFormat: post.contentFormat,
							tags: post.tags.join(", "),
						}}
					/>
				</div>

				<footer className="status-bar post-status-bar">
					<p className="status-bar-field">Chronicle · Editing {post.title}</p>
				</footer>
			</section>
		</main>
	);
}

function EditPostLoading() {
	return (
		<main className="desktop-area">
			<section
				className="window post-window"
				aria-busy="true"
				aria-label="Loading post editor"
			>
				<div className="title-bar">
					<div className="title-bar-text">Edit Blog Post</div>
					<WindowControls />
				</div>

				<div className="window-body post-window-body">
					<p className="m-0 text-black">Loading post editor...</p>
				</div>
			</section>
		</main>
	);
}
