export default function BlogPostLoading() {
	return (
		<main className="desktop-area">
			<article
				className="window post-window"
				aria-busy="true"
				aria-label="Loading blog post"
			>
				<div className="title-bar">
					<div className="title-bar-text">Loading post...</div>

					<div className="title-bar-controls" aria-hidden="true">
						<button type="button" tabIndex={-1}>
							<span aria-hidden="true">_</span>
						</button>

						<button type="button" tabIndex={-1}>
							<span aria-hidden="true">□</span>
						</button>

						<button type="button" tabIndex={-1}>
							<span aria-hidden="true">×</span>
						</button>
					</div>
				</div>

				<nav className="post-menu" aria-label="Loading post actions">
					<span className="post-menu__item">Blogs</span>
					<span className="post-menu__item">View</span>
					<span className="post-menu__item">Comment</span>
					<span className="post-menu__item post-menu__item--disabled">New</span>
					<span className="post-menu__item post-menu__item--disabled">
						Edit
					</span>
					<span className="post-menu__item post-menu__item--disabled">
						Delete
					</span>
				</nav>

				<div className="window-body post-window-body">
					<header className="post-header">
						<div className="skeleton skeleton-post-date" />

						<div className="skeleton skeleton-post-page-title" />

						<div className="skeleton-tag-list">
							<div className="skeleton skeleton-tag" />
							<div className="skeleton skeleton-tag" />
							<div className="skeleton skeleton-tag" />
						</div>
					</header>

					<div className="skeleton skeleton-post-cover" />

					<hr />

					<section className="post-content">
						<div className="skeleton skeleton-body-line" />
						<div className="skeleton skeleton-body-line" />
						<div className="skeleton skeleton-body-line-short" />

						<div className="skeleton skeleton-section-heading" />

						<div className="skeleton skeleton-body-line" />
						<div className="skeleton skeleton-body-line" />
						<div className="skeleton skeleton-body-line-medium" />
					</section>

					<hr />

					<section className="comments-section">
						<div className="skeleton skeleton-comments-heading" />

						<div className="skeleton skeleton-form-label" />
						<div className="skeleton skeleton-form-input" />

						<div className="skeleton skeleton-form-label" />
						<div className="skeleton skeleton-form-textarea" />

						<div className="skeleton skeleton-comment-button" />
					</section>
				</div>

				<footer className="status-bar post-status-bar">
					<p className="status-bar-field">
						Chronicle · Cham Mendez · © 1995 All Rights Reserved.
					</p>
				</footer>
			</article>
		</main>
	);
}
