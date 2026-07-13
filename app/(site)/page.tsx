import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { mockPosts } from "@/lib/mock-posts";

const RECENT_POST_LIMIT = 4;

export default function HomePage() {
	const recentPosts = mockPosts.slice(0, RECENT_POST_LIMIT);

	return (
		<div className="space-y-4">
			<section className="site-panel p-5 sm:p-6">
				<h2 className="site-heading text-2xl sm:text-3xl">
					Welcome to Chronicle
				</h2>

				<p className="mt-4 max-w-2xl leading-7">
					Chronicle is my personal corner of the web for projects, programming
					notes, collected resources, and anything else that seems worth
					preserving.
				</p>

				<p className="mt-3 max-w-2xl leading-7">
					The site changes between an adventurous parchment archive and an
					electric late-night theme.
				</p>
			</section>

			<section className="space-y-4" aria-labelledby="recent-entries-heading">
				<div className="site-panel flex flex-wrap items-center justify-between gap-3 p-4">
					<div>
						<h2 id="recent-entries-heading" className="site-heading text-2xl">
							Recent entries
						</h2>

						<p className="mt-1 text-sm">The latest additions to the archive.</p>
					</div>

					<Link href="/blog" className="site-link font-bold">
						View all entries →
					</Link>
				</div>

				{recentPosts.map((post) => (
					<PostCard key={post.id} post={post} compact />
				))}
			</section>

			<section className="site-panel p-5 sm:p-6">
				<h2 className="site-heading text-2xl">Guestbook</h2>

				<p className="mt-3 leading-7">
					This space is reserved for the future site-wide guestbook. It will be
					separate from comments attached to individual blog entries.
				</p>
			</section>
		</div>
	);
}
