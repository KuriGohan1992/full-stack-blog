import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Resources",
	description:
		"Tools, references, articles, and websites collected by Chronicle.",
};

const resourceGroups = [
	{
		title: "Development",
		items: [
			{
				label: "Next.js Documentation",
				href: "https://nextjs.org/docs",
			},
			{
				label: "React Documentation",
				href: "https://react.dev",
			},
		],
	},
	{
		title: "Design and the old web",
		items: [
			{
				label: "Add your first reference",
				href: "#",
			},
		],
	},
] as const;

export default function ResourcesPage() {
	return (
		<section className="site-panel p-5 sm:p-6">
			<h1 className="site-heading text-3xl">Resources</h1>

			<p className="mt-3 leading-7">
				A growing collection of tools, references, archives, and websites that
				helped shape Chronicle.
			</p>

			<div className="mt-6 space-y-6">
				{resourceGroups.map((group) => (
					<section key={group.title}>
						<h2 className="site-heading text-xl">{group.title}</h2>

						<ul className="mt-3 list-disc space-y-2 pl-6">
							{group.items.map((item) => (
								<li key={item.label}>
									<a href={item.href} className="site-link">
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</section>
	);
}
