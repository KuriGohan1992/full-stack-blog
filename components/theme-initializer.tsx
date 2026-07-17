"use client";

import { useLayoutEffect } from "react";

import { getStoredWallpaper } from "@/lib/theme-storage";

export function ThemeInitializer() {
	useLayoutEffect(() => {
		const storedTheme = window.localStorage.getItem("chronicle-theme");

		const theme = storedTheme === "sky" ? "sky" : "paper";
		const wallpaper = getStoredWallpaper(theme);

		document.documentElement.dataset.theme = theme;
		document.documentElement.dataset.wallpaper = wallpaper;
	}, []);

	return null;
}
