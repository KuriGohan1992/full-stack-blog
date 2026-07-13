import Link from "next/link";

const navigationItems = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "/blog",
		label: "Blog",
	},
	{
		href: "/resources",
		label: "Resources",
	},
] as const;

type SiteNavigationProps = Readonly<{
	compact?: boolean;
}>;

export function SiteNavigation({ compact = false }: SiteNavigationProps) {
	return (
		<nav aria-label="Primary navigation">
			<ul
				className={
					compact
						? "flex flex-wrap justify-center gap-x-5 gap-y-2"
						: "space-y-2"
				}
			>
				{navigationItems.map((item) => (
					<li key={item.href}>
						<Link href={item.href} className="site-link">
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
