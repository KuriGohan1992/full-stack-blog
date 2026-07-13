"use client";

import { useEffect, useState } from "react";

type Theme = "parchment" | "lightning";

const THEME_STORAGE_KEY = "chronicle-theme";

export function ThemeSwitcher() {
	const [theme, setTheme] = useState<Theme>("parchment");

	useEffect(() => {
		const currentTheme = document.documentElement.dataset.theme;

		if (currentTheme === "parchment" || currentTheme === "lightning") {
			setTheme(currentTheme);
		}
	}, []);

	function switchTheme() {
		const nextTheme: Theme = theme === "parchment" ? "lightning" : "parchment";

		document.documentElement.dataset.theme = nextTheme;
		window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

		setTheme(nextTheme);
	}

	return (
		<button
			type="button"
			onClick={switchTheme}
			aria-pressed={theme === "lightning"}
			className="site-button w-full"
		>
			Switch to {theme === "parchment" ? "lightning" : "parchment"}
		</button>
	);
}
