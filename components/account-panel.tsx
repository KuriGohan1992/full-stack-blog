import { AdminLoginOverlay } from "@/components/admin-login-overlay";
import { logoutAdmin } from "@/lib/actions/admin-auth";
import { isAdmin } from "@/lib/auth/admin-session";

export async function AccountPanel() {
	const admin = await isAdmin();

	return (
		<section className="site-panel">
			<h2 className="panel-header">Account</h2>

			<div className="panel-body">
				<p>
					Role: <strong>{admin ? "Administrator" : "Visitor"}</strong>
				</p>

				{admin ? (
					<>
						<p className="mt-1">Administrative controls are enabled.</p>

						<form action={logoutAdmin} className="mt-3 flex justify-center">
							<button type="submit" className="site-button">
								Sign out
							</button>
						</form>
					</>
				) : (
					<>
						<p className="mt-1">Sign in to manage posts and comments.</p>

						<AdminLoginOverlay />
					</>
				)}
			</div>
		</section>
	);
}
