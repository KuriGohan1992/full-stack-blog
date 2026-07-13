"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type BlogFiltersProps = Readonly<{
	tags: string[];
}>;

export function BlogFilters({ tags }: BlogFiltersProps) {
	const searchParams = useSearchParams();
	const selectedTags = searchParams.getAll("tag");

	function buildTagUrl(tag?: string) {
		const nextParams = new URLSearchParams(searchParams.toString());

		nextParams.delete("page");

		if (!tag) {
			nextParams.delete("tag");
		} else {
			const nextTags = selectedTags.includes(tag)
				? selectedTags.filter((selectedTag) => selectedTag !== tag)
				: [...selectedTags, tag];

			nextParams.delete("tag");

			for (const nextTag of nextTags) {
				nextParams.append("tag", nextTag);
			}
		}

		const queryString = nextParams.toString();

		return queryString ? `/blog?${queryString}` : "/blog";
	}

	return (
		<nav aria-label="Filter blog entries by tag">
			<h2 className="site-heading text-lg">Filter by tag</h2>

			<div className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-wrap">
				<Link
					href={buildTagUrl()}
					data-active={selectedTags.length === 0}
					className="tag-link"
				>
					#all
				</Link>

				{tags.map((tag) => (
					<Link
						key={tag}
						href={buildTagUrl(tag)}
						data-active={selectedTags.includes(tag)}
						className="tag-link"
					>
						#{tag}
					</Link>
				))}
			</div>
		</nav>
	);
}
