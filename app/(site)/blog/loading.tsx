const BLOG_SKELETON_IDS = [
	"blog-skeleton-1",
	"blog-skeleton-2",
	"blog-skeleton-3",
	"blog-skeleton-4",
] as const;

export default function BlogLoading() {
	return (
		<section
			className="site-panel blog-archive"
			aria-busy="true"
			aria-label="Loading blog entries"
		>
			<div className="blog-archive-intro">
				<div className="skeleton skeleton-heading" />

				<div className="skeleton skeleton-intro-line" />

				<div className="skeleton skeleton-note-line" />
			</div>

			<div className="blog-controls">
				<div className="blog-search-row">
					<div className="skeleton skeleton-search-input" />

					<div className="skeleton skeleton-search-button" />
				</div>
			</div>

			<div className="blog-filter-container">
				<div className="skeleton skeleton-filter-heading" />

				<div className="skeleton-tag-list">
					<div className="skeleton skeleton-tag" />
					<div className="skeleton skeleton-tag" />
					<div className="skeleton skeleton-tag" />
					<div className="skeleton skeleton-tag" />
					<div className="skeleton skeleton-tag" />
					<div className="skeleton skeleton-tag" />
				</div>

				<div className="skeleton skeleton-clear-filter-button" />
			</div>

			<div className="blog-results-divider blog-results-divider-empty" />

			<section className="blog-entry-list" aria-label="Loading blog posts">
				{BLOG_SKELETON_IDS.map((skeletonId) => (
					<article
						key={skeletonId}
						className="post-result grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)]"
					>
						<div className="skeleton aspect-4/3 w-full" />

						<div className="skeleton-post-content">
							<div className="skeleton skeleton-date" />

							<div className="skeleton skeleton-post-title" />

							<div className="skeleton skeleton-excerpt-line" />
							<div className="skeleton skeleton-excerpt-line-short" />

							<div className="skeleton-tag-list">
								<div className="skeleton skeleton-tag" />
								<div className="skeleton skeleton-tag" />
								<div className="skeleton skeleton-tag" />
							</div>
						</div>
					</article>
				))}
			</section>

			<div className="blog-pagination">
				<div className="skeleton skeleton-pagination-button" />
				<div className="skeleton skeleton-pagination-button" />
			</div>
		</section>
	);
}
