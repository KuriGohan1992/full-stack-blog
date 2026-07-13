import type { Metadata } from "next";

import { BlogFilters } from "@/components/blog-filters";
import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { availableTags, mockPosts } from "@/lib/mock-posts";

export const metadata: Metadata = {
	title: "Blog",
	description: "Browse all Chronicle entries by title, keyword, and tag.",
};

const POSTS_PER_PAGE = 4;

type BlogPageProps = Readonly<{
	searchParams: Promise<{
		q?: string;
		tag?: string | string[];
		page?: string;
	}>;
}>;

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const resolvedSearchParams = await searchParams;

	const query = resolvedSearchParams.q?.trim().toLowerCase() ?? "";

	const selectedTags =
		typeof resolvedSearchParams.tag === "string"
			? [resolvedSearchParams.tag]
			: (resolvedSearchParams.tag ?? []);

	const requestedPage = Number(resolvedSearchParams.page ?? "1");

	const filteredPosts = mockPosts.filter((post) => {
		const matchesSearch =
			query.length === 0 ||
			post.title.toLowerCase().includes(query) ||
			post.excerpt.toLowerCase().includes(query) ||
			post.tags.some((tag) => tag.toLowerCase().includes(query));

		const matchesEverySelectedTag = selectedTags.every((selectedTag) =>
			post.tags.includes(selectedTag),
		);

		return matchesSearch && matchesEverySelectedTag;
	});

	const totalPages = Math.max(
		1,
		Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
	);

	const currentPage = Number.isInteger(requestedPage)
		? Math.min(Math.max(requestedPage, 1), totalPages)
		: 1;

	const startingIndex = (currentPage - 1) * POSTS_PER_PAGE;

	const paginatedPosts = filteredPosts.slice(
		startingIndex,
		startingIndex + POSTS_PER_PAGE,
	);

	return (
		<div className="space-y-4">
			<section className="site-panel p-5 sm:p-6">
				<h1 className="site-heading text-3xl">All entries</h1>

				<p className="mt-3 leading-7">
					Search the full archive or combine multiple tags. When several tags
					are selected, a post must contain every selected tag.
				</p>

				<form
					method="get"
					action="/blog"
					className="mt-5 flex flex-col gap-2 sm:flex-row"
				>
					<label htmlFor="blog-search" className="sr-only">
						Search blog entries
					</label>

					<input
						id="blog-search"
						name="q"
						type="search"
						defaultValue={resolvedSearchParams.q ?? ""}
						placeholder="Search the archive..."
						className="site-input min-w-0 flex-1"
					/>

					{selectedTags.map((tag) => (
						<input key={tag} type="hidden" name="tag" value={tag} />
					))}

					<button type="submit" className="site-button">
						Search
					</button>
				</form>

				<div className="mt-5">
					<BlogFilters tags={availableTags} />
				</div>
			</section>

			<div className="site-panel p-4 text-sm">
				Showing {paginatedPosts.length} of {filteredPosts.length} matching
				entries.
			</div>

			<section className="space-y-4" aria-label="Blog entries">
				{paginatedPosts.length > 0 ? (
					paginatedPosts.map((post) => <PostCard key={post.id} post={post} />)
				) : (
					<div className="site-panel p-6 text-center">
						<h2 className="site-heading text-xl">No entries found</h2>

						<p className="mt-2">Try another search or clear some filters.</p>
					</div>
				)}
			</section>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				query={query}
				selectedTags={selectedTags}
			/>
		</div>
	);
}
