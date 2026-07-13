import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { mockPosts } from "@/lib/mock-posts";

const RECENT_POST_LIMIT = 4;

export default function HomePage() {
	const recentPosts = mockPosts.slice(0, RECENT_POST_LIMIT);

	return (
		<div>
			<section className="site-panel p-2">
				<h2 className="site-heading text-2xl">Welcome to Chronicle</h2>

				<p className="mt-2">
					Chronicle is my personal corner of the web for projects, programming
					notes, collected resources, and anything else that seems worth
					preserving.
				</p>

				<p className="mt-2">
					The site changes between an adventurous parchment archive and an
					electric late-night theme.
				</p>
			</section>

			<section
				className="recent-entries"
				aria-labelledby="recent-entries-heading"
			>
				<header className="recent-entries-heading">
					<div>
						<h2 id="recent-entries-heading" className="site-heading text-2xl">
							Recent entries
						</h2>

						<p className="text-sm">The latest additions to the archive.</p>
					</div>

					<Link href="/blog" className="site-link">
						View all entries →
					</Link>
				</header>

				<div className="recent-entries-list">
					{recentPosts.map((post) => (
						<PostCard key={post.id} post={post} compact />
					))}
				</div>
			</section>

			<section className="site-panel-dashed site-panel mt-2 p-3">
				<h2 className="site-heading text-xl">Guestbook</h2>

				<p className="mt-2">
					Coming soon. Leave a message for the entire site.
				</p>
			</section>
		</div>
	);
}
