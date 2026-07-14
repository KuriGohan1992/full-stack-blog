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

	const originalQuery = resolvedSearchParams.q?.trim() ?? "";

	const normalizedQuery = originalQuery.toLowerCase();

	const selectedTags =
		typeof resolvedSearchParams.tag === "string"
			? [resolvedSearchParams.tag]
			: (resolvedSearchParams.tag ?? []);

	const requestedPage = Number(resolvedSearchParams.page ?? "1");

	const filteredPosts = mockPosts.filter((post) => {
		const matchesSearch =
			normalizedQuery.length === 0 ||
			post.title.toLowerCase().includes(normalizedQuery) ||
			post.excerpt.toLowerCase().includes(normalizedQuery) ||
			post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

		const matchesSelectedTags = selectedTags.every((selectedTag) =>
			post.tags.includes(selectedTag),
		);

		return matchesSearch && matchesSelectedTags;
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

	const hasActiveFilters = originalQuery.length > 0 || selectedTags.length > 0;

	return (
		<section className="site-panel blog-archive">
			<div className="blog-archive-intro">
				<h1 className="site-heading text-3xl">All blog posts</h1>

				<p className="mt-1">Search the archive or filter posts by tag.</p>

				<p className="blog-filter-note">
					Note: When multiple tags are selected, a post must contain every
					selected tag.
				</p>
			</div>
			<form method="get" action="/blog" className="blog-controls">
				<div className="blog-search-row">
					<label htmlFor="blog-search" className="sr-only">
						Search blog entries
					</label>
					<input
						id="blog-search"
						name="q"
						type="search"
						defaultValue={originalQuery}
						placeholder="Search the archive..."
						className="blog-search-input"
					/>
					{selectedTags.map((tag) => (
						<input key={tag} type="hidden" name="tag" value={tag} />
					))}
					<button type="submit" className="raw-form-button">
						Search
					</button>
				</div>
			</form>
			<div className="blog-filter-container">
				<BlogFilters
					tags={availableTags}
					selectedTags={selectedTags}
					query={originalQuery}
				/>
			</div>
			<div
				className={
					hasActiveFilters
						? "blog-results-divider"
						: "blog-results-divider blog-results-divider-empty"
				}
			>
				{hasActiveFilters && (
					<p>
						{filteredPosts.length} matching{" "}
						{filteredPosts.length === 1 ? "post" : "posts"}.
					</p>
				)}
			</div>

			<section className="blog-entry-list" aria-label="Blog entries">
				{paginatedPosts.length > 0 ? (
					paginatedPosts.map((post) => <PostCard key={post.id} post={post} />)
				) : (
					<div className="blog-empty-state">
						<h2 className="site-heading text-xl">No entries found</h2>

						<p className="mt-1">
							Try another search or clear the current filters.
						</p>
					</div>
				)}
			</section>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				query={originalQuery}
				selectedTags={selectedTags}
			/>
		</section>
	);
}
