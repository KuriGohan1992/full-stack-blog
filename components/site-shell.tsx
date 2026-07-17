import type { ReactNode } from "react";
import { AccountPanel } from "./account-panel";
import { SiteLogo } from "./site-logo";
import { SiteNavigation } from "./site-navigation";
import { SocialLinks } from "./social-links";
import { ThemeSwitcher } from "./theme-switcher";
import { WallpaperSwitcher } from "./wallpaper-switcher";

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

				<div className="mb-2 grid gap-2 lg:hidden">
					<section className="site-panel">
						<h2 className="panel-header">Account</h2>

						<AccountPanel />
					</section>
					<section className="site-panel">
						<h2 className="panel-header">Theme</h2>

						<div className="panel-body text-center">
							<ThemeSwitcher />
						</div>
					</section>
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
							<h2 className="panel-header">Alternate background</h2>

							<div className="panel-body">
								<WallpaperSwitcher />
							</div>
						</section>
					</aside>

					<main className="site-center-scroll">{children}</main>

					<aside className="hidden min-h-0 space-y-2 lg:block">
						<section className="site-panel">
							<AccountPanel />
						</section>

						<section className="site-panel">
							<h2 className="panel-header">Theme</h2>

							<div className="panel-body text-center">
								<ThemeSwitcher />
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

				<section className="site-panel mt-2 lg:hidden">
					<h2 className="panel-header">Alternate background</h2>

					<div className="panel-body">
						<WallpaperSwitcher />
					</div>
				</section>

				<section className="site-panel mt-2 lg:hidden">
					<h2 className="panel-header">Links</h2>

					<div className="panel-body">
						<SocialLinks />
					</div>
				</section>
			</div>
		</div>
	);
}
