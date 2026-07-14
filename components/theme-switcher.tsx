"use client";

import { useEffect, useState } from "react";
import { getCurrentTheme, saveTheme, type Theme } from "@/lib/theme-storage";

export function ThemeSwitcher() {
	const [theme, setTheme] = useState<Theme>("paper");

	useEffect(() => {
		setTheme(getCurrentTheme());
	}, []);

	function switchTheme() {
		const nextTheme: Theme = theme === "paper" ? "sky" : "paper";

		saveTheme(nextTheme);

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
