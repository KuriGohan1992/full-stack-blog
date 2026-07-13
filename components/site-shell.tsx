import type { ReactNode } from "react";

import { SiteLogo } from "./site-logo";
import { SiteNavigation } from "./site-navigation";
import { SocialLinks } from "./social-links";
import { ThemeSwitcher } from "./theme-switcher";

type SiteShellProps = Readonly<{
	children: ReactNode;
}>;

export function SiteShell({ children }: SiteShellProps) {
	return (
		<div className="site-background px-3 py-4 sm:px-5">
			<div className="mx-auto w-full max-w-[1440px]">
				<SiteLogo />

				<div className="site-panel mb-4 p-3 lg:hidden">
					<SiteNavigation compact />
				</div>

				<div className="grid gap-4 lg:grid-cols-[minmax(180px,1fr)_minmax(0,2fr)_minmax(180px,1fr)] xl:grid-cols-[minmax(220px,1fr)_minmax(0,2fr)_minmax(220px,1fr)]">
					<aside className="hidden space-y-4 lg:block">
						<section className="site-panel p-4">
							<SiteNavigation />
						</section>

						<section className="site-panel p-4">
							<h2 className="site-heading text-lg">Status</h2>

							<p className="mt-3 text-sm leading-6">
								Currently building Chronicle.
							</p>

							<p className="mt-2 text-sm">Role: Visitor</p>
						</section>

						<section className="site-panel p-4">
							<h2 className="site-heading text-lg">Future corner</h2>

							<p className="mt-3 text-sm leading-6">
								Stickers, GIFs, buttons, or a counter can be placed here later.
							</p>
						</section>
					</aside>

					<main className="min-w-0">{children}</main>

					<aside className="space-y-4">
						<section className="site-panel p-4">
							<h2 className="site-heading text-lg">Theme</h2>

							<div className="mt-3">
								<ThemeSwitcher />
							</div>
						</section>

						<section className="site-panel p-4">
							<h2 className="site-heading text-lg">Account</h2>

							<p className="mt-3 text-sm">Role: Visitor</p>

							<p className="mt-2 text-sm leading-6">
								Admin sign-in and writing controls will be connected later.
							</p>
						</section>

						<section className="site-panel p-4">
							<SocialLinks />
						</section>
					</aside>
				</div>
			</div>
		</div>
	);
}
