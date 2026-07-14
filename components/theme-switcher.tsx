"use client";

import { useEffect, useState } from "react";

type Theme = "paper" | "sky";

const THEME_STORAGE_KEY = "chronicle-theme";

function getCurrentTheme(): Theme {
	return document.documentElement.dataset.theme === "sky" ? "sky" : "paper";
}

export function ThemeSwitcher() {
	const [theme, setTheme] = useState<Theme>("paper");

	useEffect(() => {
		setTheme(getCurrentTheme());
	}, []);

	function switchTheme() {
		const nextTheme: Theme = theme === "paper" ? "sky" : "paper";

		document.documentElement.dataset.theme = nextTheme;
		window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
		setTheme(nextTheme);
	}

	return (
		<button
			type="button"
			onClick={switchTheme}
			className="site-button"
			aria-label={`Switch from ${theme} theme`}
		>
			Switch Theme
		</button>
	);
}
