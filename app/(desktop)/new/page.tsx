import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { AdminPostForm } from "@/components/admin-post-form";
import { BackButton } from "@/components/back-button";
import { WindowControls } from "@/components/window-controls";
import { isAdmin } from "@/lib/auth/admin-session";

export const metadata: Metadata = {
	title: "New Post",
	description: "Create a new Chronicle blog post.",
};

export default function NewPostPage() {
	return (
		<Suspense fallback={<NewPostLoading />}>
			<NewPostContent />
		</Suspense>
	);
}

async function NewPostContent() {
	if (!(await isAdmin())) {
		redirect("/");
	}

	return (
		<main className="desktop-area">
			<section className="window post-window">
				<div className="title-bar">
					<div className="title-bar-text">New Blog Post</div>

					<WindowControls />
				</div>

				<div className="window-body post-window-body">
					<BackButton />

					<header className="mb-2 border-b border-[#808080] pb-3">
						<h1 className="mt-2 mb-0 text-4xl font-normal text-black">
							Create a new post
						</h1>

						<p className="mt-1 text-sm text-[#555]">
							Complete the fields below, preview the result, and publish it to
							Chronicle.
						</p>
					</header>

					<AdminPostForm mode="create" />
				</div>

				<footer className="status-bar post-status-bar">
					<p className="status-bar-field">Chronicle · Creating a new entry</p>
				</footer>
			</section>
		</main>
	);
}

function NewPostLoading() {
	return (
		<main className="desktop-area">
			<section
				className="window post-window"
				aria-busy="true"
				aria-label="Loading post editor"
			>
				<div className="title-bar">
					<div className="title-bar-text">New Blog Post</div>

					<WindowControls />
				</div>

				<div className="window-body post-window-body">
					<p className="m-0 text-black">Loading post editor...</p>
				</div>

				<footer className="status-bar post-status-bar">
					<p className="status-bar-field">Chronicle</p>
				</footer>
			</section>
		</main>
	);
}
