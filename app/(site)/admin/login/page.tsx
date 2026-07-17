import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin-login-form";
import { isAdmin } from "@/lib/auth/admin-session";

export const metadata: Metadata = {
	title: "Admin Login",
	description: "Sign in to Chronicle's administration tools.",
};

export default async function AdminLoginPage() {
	if (await isAdmin()) {
		redirect("/");
	}

	return (
		<main className="mx-auto w-full max-w-lg border border-(--panel-border-color) bg-(--panel-background) text-(--page-color)">
			<header className="panel-header">Chronicle Administration</header>

			<div className="p-4">
				<h1 className="site-heading text-2xl">Admin sign in</h1>

				<p className="mt-2">
					Enter the shared administrator password to enable post and
					comment-management controls.
				</p>

				<div className="mt-4">
					<AdminLoginForm />
				</div>
			</div>
		</main>
	);
}
