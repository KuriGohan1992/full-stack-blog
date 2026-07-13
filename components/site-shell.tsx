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
		<div className="site-background flex flex-col px-2 py-2 sm:px-3">
			<div className="mx-auto flex h-full w-full max-w-[1440px] flex-col">
				<div className="site-logo-area">
					<SiteLogo />
				</div>

				<div className="site-panel mb-2 lg:hidden">
					<h2 className="panel-header">Navigation</h2>

					<div className="panel-body">
						<SiteNavigation compact />
					</div>
				</div>

				<div className="site-layout-grid grid gap-2 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
					<aside className="hidden min-h-0 space-y-2 lg:block">
						<section className="site-panel">
							<h2 className="panel-header">Navigation</h2>

							<div className="panel-body">
								<SiteNavigation />
							</div>
						</section>


						<section className="site-panel">
							<h2 className="panel-header">Future corner</h2>

							<div className="panel-body">
								<p className="text-sm">
									Buttons, GIFs, counters, and other web debris will go here.
								</p>
							</div>
						</section>
					</aside>

					<main className="site-center-scroll">{children}</main>

					<aside className="min-h-0 space-y-2">
						<section className="site-panel">
							<h2 className="panel-header">Theme</h2>

							<div className="panel-body">
								<ThemeSwitcher />
							</div>
						</section>

						<section className="site-panel">
							<h2 className="panel-header">Account</h2>

							<div className="panel-body">
								<p className="text-sm">Role: Visitor</p>

								<p className="mt-1 text-sm">
									Admin controls will appear here later.
								</p>
							</div>
						</section>

						<section className="site-panel">
							<h2 className="panel-header">Links</h2>

							<div className="panel-body">
								<SocialLinks />
							</div>
						</section>
					</aside>
				</div>
			</div>
		</div>
	);
}
