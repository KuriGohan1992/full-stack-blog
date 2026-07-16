import { PostCard } from "@/components/post-card";
import { getRecentPosts } from "@/lib/db/queries";

const RECENT_POST_LIMIT = 4;

export async function RecentPosts() {
	const recentPosts = await getRecentPosts(RECENT_POST_LIMIT);

	if (recentPosts.length === 0) {
		return <p className="p-3">No entries have been published yet.</p>;
	}

	return (
		<div className="recent-entries-list">
			{recentPosts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
}
