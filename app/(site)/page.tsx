import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { getRecentPosts } from "@/lib/db/queries";
import { isAdmin } from "@/lib/auth/admin-session";

const RECENT_POST_LIMIT = 4;

export default async function HomePage() {
	const recentPosts = await getRecentPosts(RECENT_POST_LIMIT);
const admin = await isAdmin();
	return (
		<div>
			<section className="site-panel p-2">
				<h1 className="site-heading text-2xl">Welcome to Chronicle</h1>

				<p className="mt-2">
					Chronicle is my personal corner of the web for projects, programming
					notes, collected resources, and anything else that seems worth
					preserving.
				</p>

				<p className="mt-2">
					The site changes between an adventurous paper archive and an electric
					late-night theme.
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
					</div>

					<Link href="/blog" className="site-link">
						View all entries →
					</Link>
				</header>

				<div className="recent-entries-list">
					{recentPosts.length > 0 ? (
						recentPosts.map((post) => <PostCard key={post.id} post={post} isAdmin={admin}/>)
					) : (
						<p className="p-3">No entries have been published yet.</p>
					)}
				</div>
			</section>

			<section className="site-panel-dashed site-panel mt-2 p-3">
				<h2 className="site-heading text-xl">Guestbook (Under Development)</h2>

				<p className="mt-2">Leave a message for the entire site.</p>
			</section>
		</div>
	);
}
