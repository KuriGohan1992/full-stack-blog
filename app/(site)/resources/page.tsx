import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Resources",
	description:
		"Technologies, tools, libraries, and references used to build Chronicle.",
};

type Resource = Readonly<{
	name: string;
	description: string;
	href?: string;
}>;

type ResourceSection = Readonly<{
	title: string;
	description: string;
	resources: readonly Resource[];
}>;

const resourceSections: readonly ResourceSection[] = [
	{
		title: "Core framework",
		description:
			"The main technologies responsible for rendering and structuring the application.",
		resources: [
			{
				name: "Next.js 16",
				description:
					"Provides the App Router, Server Components, Server Actions, routing, metadata, loading states, and error boundaries.",
			},
			{
				name: "React 19",
				description:
					"Provides the component model and hooks such as useActionState and useFormStatus.",
			},
			{
				name: "TypeScript",
				description:
					"Adds static types for component props, form state, database records, and utility functions.",
			},
		],
	},
	{
		title: "Styling and interface",
		description:
			"The tools, asset sources, and visual references used for Chronicle's old-web and desktop-inspired design.",
		resources: [
			{
				name: "Tailwind CSS 4",
				description:
					"Handles utility-based layouts, responsive styling, spacing, typography, and one-off page designs.",
			},
			{
				name: "98.css",
				description:
					"Provides the Windows 98-inspired window, title bar, controls, status bar, and form appearance used on individual post pages.",
				href: "https://jdan.github.io/98.css/",
			},
			{
				name: "Make WordArt",
				description:
					"Used to create retro word-art graphics and title assets for the site.",
				href: "https://www.makewordart.com/",
			},
			{
				name: "CoolText",
				description:
					"Used to generate stylized Chronicle title and logo graphics.",
				href: "https://cooltext.com/",
			},
			{
				name: "Background Archive",
				description:
					"Source of the tiled old-web background textures used throughout Chronicle.",
				href: "https://hekate2.github.io/website-tools/archive/backgrounds.html",
			},
			{
				name: "HTTP Cats",
				description:
					"Supplies the illustrated HTTP 404 and 500 images used by Chronicle's not-found and error pages.",
				href: "https://http.cat/",
			},
		],
	},
	{
		title: "Database and validation",
		description:
			"The server-side tools responsible for persistent posts, comments, and validation.",
		resources: [
			{
				name: "Neon PostgreSQL",
				description:
					"Stores blog posts, tags, content formats, cover-image paths, comments, and moderation state.",
			},
			{
				name: "Drizzle ORM",
				description:
					"Defines the database schema and provides typed queries for posts and comments.",
			},
			{
				name: "Drizzle Kit",
				description:
					"Generates SQL migration files and applies migrations to the Neon database.",
			},
			{
				name: "Neon serverless driver",
				description:
					"Connects the Next.js server environment to Neon through its HTTP database driver.",
			},
			{
				name: "Zod",
				description:
					"Validates comment and future administrative form submissions before database mutations.",
			},
		],
	},
	{
		title: "Content and interaction",
		description:
			"Libraries and Next.js features used for posts, comments, and interactive forms.",
		resources: [
			{
				name: "React Markdown",
				description:
					"Renders posts stored with the Markdown content format as React elements.",
			},
			{
				name: "remark-gfm",
				description:
					"Adds GitHub Flavored Markdown features such as tables, task lists, and strikethrough.",
			},
			{
				name: "Server Actions",
				description:
					"Handle comment submissions and future administrative mutations without a separate API route.",
			},
			{
				name: "React Suspense",
				description:
					"Shows temporary loading UI while asynchronous components such as comment counts finish rendering.",
			},
			{
				name: "js-cookie",
				description:
					"Stores the selected theme and wallpaper preferences in browser cookies.",
			},
		],
	},
	{
		title: "Development and deployment",
		description:
			"The tools used to install packages, maintain quality, seed data, and publish the application.",
		resources: [
			{
				name: "pnpm",
				description:
					"Manages project dependencies and runs development, migration, seed, check, and build scripts.",
			},
			{
				name: "Biome",
				description:
					"Formats the codebase and checks code quality, accessibility, and common implementation mistakes.",
			},
			{
				name: "tsx",
				description:
					"Runs TypeScript scripts directly, including the database seed script.",
			},
			{
				name: "Git and GitHub",
				description:
					"Track the project history, migration files, source code, and Conventional Commit messages.",
			},
			{
				name: "Vercel",
				description:
					"Hosts the production Next.js application and supplies its deployment environment variables.",
			},
		],
	},
];

export default function ResourcesPage() {
	const _newLocal =
		"border-t border-(--panel-border-color) px-4 py-3 text-center text-sm text-(--muted-color)";
	return (
		<main className="border border-(--panel-border-color) bg-(--panel-background) text-(--page-color)">
			<header className="border-b border-(--panel-border-color) px-4 py-4">
				<h1 className="font-sans text-3xl font-bold text-(--heading-color)">
					Resources
				</h1>

				<p className="mt-1 max-w-3xl leading-6">
					A collection of the technologies, libraries, services, and references
					used while building Chronicle.
				</p>
			</header>

			<div className="px-4 py-2">
				{resourceSections.map((section) => (
					<section
						key={section.title}
						className="border-b border-dotted border-(--panel-border-color) py-5 last:border-b-0"
					>
						<h2 className="font-sans text-xl font-bold text-(--heading-color)">
							{section.title}
						</h2>

						<p className="mt-1 max-w-3xl text-sm leading-5 text-(--muted-color)">
							{section.description}
						</p>

						<ul className="mt-4 space-y-3 pl-6">
							{section.resources.map((resource) => (
								<li
									key={resource.name}
									className="list-disc marker:text-(--link-color)"
								>
									<p className="leading-6">
										{resource.href ? (
											<a
												href={resource.href}
												target="_blank"
												rel="noreferrer"
												className="site-link"
											>
												<strong className="font-['Arial']">{resource.name}</strong>
											</a>
										) : (
											<strong>{resource.name}</strong>
										)}

										<span aria-hidden="true"> — </span>

										<span>{resource.description}</span>
									</p>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</main>
	);
}
