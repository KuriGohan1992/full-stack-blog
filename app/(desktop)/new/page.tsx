import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminPostForm } from "@/components/admin-post-form";
import { BackButton } from "@/components/back-button";
import { WindowControls } from "@/components/window-controls";
import { isAdmin } from "@/lib/auth/admin-session";

export const metadata: Metadata = {
	title: "New Post",
	description: "Create a new Chronicle blog post.",
};

export default async function NewPostPage() {
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
					<header className="mb-4 border-b border-[#808080] pb-3">
						<BackButton />
						<div className="flex flex-wrap items-center justify-between gap-3">
							<h2 className="m-0 text-3xl font-normal text-black">
								Create a new post
							</h2>
						</div>

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
