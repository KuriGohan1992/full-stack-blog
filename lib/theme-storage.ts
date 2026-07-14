import Cookies from "js-cookie";

export type Theme = "paper" | "sky";

export type Wallpaper = "newspaper" | "paper" | "stars" | "electric";

export const THEME_STORAGE_KEY = "chronicle-theme";

export const PAPER_WALLPAPER_KEY = "chronicle-paper-wallpaper";

export const SKY_WALLPAPER_KEY = "chronicle-sky-wallpaper";

export function getCurrentTheme(): Theme {
	return document.documentElement.dataset.theme === "sky" ? "sky" : "paper";
}

export function getDefaultWallpaper(theme: Theme): Wallpaper {
	return theme === "sky" ? "stars" : "newspaper";
}

export function getWallpaperStorageKey(theme: Theme) {
	return theme === "sky" ? SKY_WALLPAPER_KEY : PAPER_WALLPAPER_KEY;
}

export function getStoredWallpaper(theme: Theme): Wallpaper {
	const storageKey = getWallpaperStorageKey(theme);

	const storedWallpaper = window.localStorage.getItem(storageKey);

	if (
		theme === "paper" &&
		(storedWallpaper === "newspaper" || storedWallpaper === "paper")
	) {
		return storedWallpaper;
	}

	if (
		theme === "sky" &&
		(storedWallpaper === "stars" || storedWallpaper === "electric")
	) {
		return storedWallpaper;
	}

	return getDefaultWallpaper(theme);
}

export function saveTheme(theme: Theme) {
	window.localStorage.setItem(THEME_STORAGE_KEY, theme);

	Cookies.set(THEME_STORAGE_KEY, theme, {
		expires: 365,
		path: "/",
	});

	document.documentElement.dataset.theme = theme;
}

export function saveWallpaper(theme: Theme, wallpaper: Wallpaper) {
	const storageKey = getWallpaperStorageKey(theme);

	window.localStorage.setItem(storageKey, wallpaper);

	Cookies.set(storageKey, wallpaper, {
		expires: 365,
		path: "/",
	});

	document.documentElement.dataset.wallpaper = wallpaper;
}
