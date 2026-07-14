import Link from "next/link";

type PaginationProps = Readonly<{
	currentPage: number;
	totalPages: number;
	query: string;
	selectedTags: string[];
}>;

function buildPageUrl(page: number, query: string, selectedTags: string[]) {
	const params = new URLSearchParams();

	if (query) {
		params.set("q", query);
	}

	for (const tag of selectedTags) {
		params.append("tag", tag);
	}

	params.set("page", String(page));

	return `/blog?${params.toString()}`;
}

export function Pagination({
	currentPage,
	totalPages,
	query,
	selectedTags,
}: PaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	return (
		<nav aria-label="Blog pagination" className="blog-pagination">
			{currentPage > 1 && (
				<Link
					href={buildPageUrl(currentPage - 1, query, selectedTags)}
					className="win98-button"
				>
					← Previous
				</Link>
			)}

			{Array.from({ length: totalPages }, (_, index) => index + 1).map(
				(page) => (
					<Link
						key={page}
						href={buildPageUrl(page, query, selectedTags)}
						aria-current={page === currentPage ? "page" : undefined}
						className="win98-button"
					>
						{page}
					</Link>
				),
			)}

			{currentPage < totalPages && (
				<Link
					href={buildPageUrl(currentPage + 1, query, selectedTags)}
					className="win98-button"
				>
					Next →
				</Link>
			)}
		</nav>
	);
}
