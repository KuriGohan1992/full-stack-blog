"use client";

import { useRef } from "react";

type BlogFiltersProps = Readonly<{
	tags: string[];
	selectedTags: string[];
	query: string;
}>;

export function BlogFilters({ tags, selectedTags, query }: BlogFiltersProps) {
	const formRef = useRef<HTMLFormElement>(null);

	function submitFilters() {
		formRef.current?.requestSubmit();
	}

	function clearFilters() {
		const form = formRef.current;

		if (!form) {
			return;
		}

		for (const element of form.elements) {
			if (element instanceof HTMLInputElement && element.type === "checkbox") {
				element.checked = false;
			}
		}

		form.requestSubmit();
	}

	return (
		<form
			ref={formRef}
			method="get"
			action="/blog"
			className="blog-filter-fieldset"
			onChange={submitFilters}
		>
			{query && <input type="hidden" name="q" value={query} />}

			<fieldset>
				<legend>Filter by tag</legend>

				<div className="blog-tag-options">
					{tags.map((tag) => {
						const inputId = `tag-${tag}`;

						return (
							<label key={tag} htmlFor={inputId} className="blog-tag-option">
								<input
									id={inputId}
									name="tag"
									type="checkbox"
									value={tag}
									defaultChecked={selectedTags.includes(tag)}
								/>

								<span>{tag}</span>
							</label>
						);
					})}
				</div>
			</fieldset>

			<button
				type="button"
				onClick={clearFilters}
				disabled={selectedTags.length === 0}
				className="clear-filter-button"
			>
				Clear filters
			</button>

			<button type="submit" hidden>
				Update filters
			</button>
		</form>
	);
}
