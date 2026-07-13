export type MockPost = {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	body: string;
	coverImage: string;
	createdAt: string;
	commentCount: number;
	tags: string[];
};

export const mockPosts: MockPost[] = [
	{
		id: "1",
		title: "Building a Personal Website Like It Was 2003",
		slug: "building-a-personal-website-like-it-was-2003",
		excerpt:
			"Why polished modern interfaces pushed me toward the stranger and more personal old web.",
		body: "This temporary body will eventually be replaced with content loaded from Neon.",
		coverImage: "/images/posts/first-post.jpg",
		createdAt: "2026-07-09T08:00:00.000Z",
		commentCount: 4,
		tags: ["design", "indie-web"],
	},
	{
		id: "2",
		title: "What Server Actions Finally Made Me Understand",
		slug: "what-server-actions-made-me-understand",
		excerpt:
			"How forms, validation, database mutations, and cache invalidation connect.",
		body: "This temporary body will eventually be replaced with content loaded from Neon.",
		coverImage: "/images/posts/second-post.jpg",
		createdAt: "2026-07-07T08:00:00.000Z",
		commentCount: 2,
		tags: ["nextjs", "development"],
	},
	{
		id: "3",
		title: "Collecting Fragments of the Old Internet",
		slug: "collecting-fragments-of-the-old-internet",
		excerpt:
			"Background tiles, tiny buttons, animated GIFs, and personal-site artifacts.",
		body: "This temporary body will eventually be replaced with content loaded from Neon.",
		coverImage: "/images/posts/third-post.jpg",
		createdAt: "2026-07-04T08:00:00.000Z",
		commentCount: 7,
		tags: ["indie-web", "resources"],
	},
	{
		id: "4",
		title: "Learning to Design Before Reaching for Components",
		slug: "learning-to-design-before-components",
		excerpt:
			"How planning structure first can prevent a page from becoming a pile of disconnected cards.",
		body: "This temporary body will eventually be replaced with content loaded from Neon.",
		coverImage: "/images/posts/fourth-post.jpg",
		createdAt: "2026-07-01T08:00:00.000Z",
		commentCount: 3,
		tags: ["design", "development"],
	},
	{
		id: "5",
		title: "A Week of Building With Next.js",
		slug: "a-week-of-building-with-nextjs",
		excerpt:
			"Notes about route groups, layouts, Server Components, and mistakes made along the way.",
		body: "This temporary body will eventually be replaced with content loaded from Neon.",
		coverImage: "/images/posts/fifth-post.jpg",
		createdAt: "2026-06-29T08:00:00.000Z",
		commentCount: 1,
		tags: ["nextjs", "development"],
	},
	{
		id: "6",
		title: "Bookmarks From the Weird Web",
		slug: "bookmarks-from-the-weird-web",
		excerpt:
			"A small collection of expressive websites, tools, archives, and design references.",
		body: "This temporary body will eventually be replaced with content loaded from Neon.",
		coverImage: "/images/posts/sixth-post.jpg",
		createdAt: "2026-06-25T08:00:00.000Z",
		commentCount: 5,
		tags: ["resources", "indie-web"],
	},
];

export const availableTags = Array.from(
	new Set(mockPosts.flatMap((post) => post.tags)),
).sort();
