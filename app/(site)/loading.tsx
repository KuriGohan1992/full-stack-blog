const HOME_POST_SKELETON_IDS = [
	"home-post-skeleton-1",
	"home-post-skeleton-2",
	"home-post-skeleton-3",
	"home-post-skeleton-4",
] as const;

export default function HomeLoading() {
	return (
		<div aria-busy="true">
			<section className="site-panel p-2">
				<div className="skeleton skeleton-home-title" />

				<div className="skeleton skeleton-home-intro-line" />

				<div className="skeleton skeleton-home-intro-line-short" />
			</section>

			<section className="recent-entries">
				<header className="recent-entries-heading">
					<div>
						<div className="skeleton skeleton-home-section-title" />

						<div className="skeleton skeleton-home-section-description" />
					</div>

					<div className="skeleton skeleton-home-view-all" />
				</header>

				<div className="recent-entries-list">
					{HOME_POST_SKELETON_IDS.map((skeletonId) => (
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
				</div>
			</section>

			<section className="site-panel-dashed site-panel mt-2 p-3">
				<div className="skeleton skeleton-home-guestbook-title" />

				<div className="skeleton skeleton-home-guestbook-text" />
			</section>
		</div>
	);
}
