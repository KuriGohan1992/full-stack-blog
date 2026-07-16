import type { Metadata } from "next";

import { BlogFilters } from "@/components/blog-filters";
import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { getAvailableTags, getPosts } from "@/lib/db/queries";

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

	const selectedTags =
		typeof resolvedSearchParams.tag === "string"
			? [resolvedSearchParams.tag]
			: (resolvedSearchParams.tag ?? []);

	const requestedPage = Number(resolvedSearchParams.page ?? "1");

	const safeRequestedPage =
		Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

	const [{ posts, totalPosts, totalPages, currentPage }, availableTags] =
		await Promise.all([
			getPosts({
				query: originalQuery,
				tags: selectedTags,
				page: safeRequestedPage,
				postsPerPage: POSTS_PER_PAGE,
			}),
			getAvailableTags(),
		]);

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
						{totalPosts} matching {totalPosts === 1 ? "post" : "posts"}
					</p>
				)}
			</div>

			<section className="blog-entry-list" aria-label="Blog entries">
				{posts.length > 0 ? (
					posts.map((post) => <PostCard key={post.id} post={post} />)
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
