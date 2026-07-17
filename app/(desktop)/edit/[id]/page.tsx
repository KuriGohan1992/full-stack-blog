import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { AdminPostForm } from "@/components/admin-post-form";
import { BackButton } from "@/components/back-button";
import { WindowControls } from "@/components/window-controls";
import { isAdmin } from "@/lib/auth/admin-session";
import { getPostById } from "@/lib/db/queries";

type EditPostPageProps = Readonly<{
	params: Promise<{
		id: string;
	}>;
}>;

export const metadata: Metadata = {
	title: "Edit Post",
	description: "Edit an existing Chronicle blog post.",
};

export default async function EditPostPage({ params }: EditPostPageProps) {
	if (!(await isAdmin())) {
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
					<div className="title-bar-text">Edit: {post.title}</div>

					<WindowControls />
				</div>

				<div className="window-body post-window-body">
					<header className="mb-4 border-b border-[#808080] pb-3">
						<BackButton />
						<h2 className="m-0 text-3xl font-normal text-black">
							Edit blog post
						</h2>

						<p className="mt-1 text-sm text-[#555]">
							Update the post details, preview your changes, and save them.
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
