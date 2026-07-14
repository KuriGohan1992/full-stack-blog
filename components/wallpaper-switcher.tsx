"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Theme = "paper" | "sky";

type Wallpaper = "newspaper" | "paper" | "stars" | "electric";

const PAPER_WALLPAPER_KEY = "chronicle-paper-wallpaper";
const SKY_WALLPAPER_KEY = "chronicle-sky-wallpaper";

function getTheme(): Theme {
	return document.documentElement.dataset.theme === "sky" ? "sky" : "paper";
}

function getDefaultWallpaper(theme: Theme): Wallpaper {
	return theme === "sky" ? "stars" : "newspaper";
}

function getStoredWallpaper(theme: Theme): Wallpaper {
	const storageKey = theme === "sky" ? SKY_WALLPAPER_KEY : PAPER_WALLPAPER_KEY;

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

export function WallpaperSwitcher() {
	const [isMounted, setIsMounted] = useState(false);
	const [theme, setTheme] = useState<Theme>("paper");
	const [wallpaper, setWallpaper] = useState<Wallpaper>("newspaper");

	useEffect(() => {
		function synchronizeWallpaper() {
			const currentTheme = getTheme();
			const currentWallpaper = getStoredWallpaper(currentTheme);

			setTheme(currentTheme);
			setWallpaper(currentWallpaper);

			document.documentElement.dataset.wallpaper = currentWallpaper;
		}

		synchronizeWallpaper();
		setIsMounted(true);

		const observer = new MutationObserver(synchronizeWallpaper);

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	function switchWallpaper() {
		const nextWallpaper: Wallpaper =
			theme === "paper"
				? wallpaper === "newspaper"
					? "paper"
					: "newspaper"
				: wallpaper === "stars"
					? "electric"
					: "stars";

		const storageKey =
			theme === "sky" ? SKY_WALLPAPER_KEY : PAPER_WALLPAPER_KEY;

		window.localStorage.setItem(storageKey, nextWallpaper);

		document.documentElement.dataset.wallpaper = nextWallpaper;

		setWallpaper(nextWallpaper);
	}

	if (!isMounted) {
		return <div className="wallpaper-option-placeholder" aria-hidden="true" />;
	}

	const alternateWallpaper: Wallpaper =
		theme === "paper"
			? wallpaper === "newspaper"
				? "paper"
				: "newspaper"
			: wallpaper === "stars"
				? "electric"
				: "stars";

	const previewSource =
		alternateWallpaper === "paper"
			? "/backgrounds/paper.jpg"
			: alternateWallpaper === "newspaper"
				? "/backgrounds/newspaper.jpg"
				: alternateWallpaper === "electric"
					? "/backgrounds/lightning.gif"
					: "/backgrounds/stars.gif";

	return (
		<button
			type="button"
			onClick={switchWallpaper}
			className="wallpaper-option"
			aria-label={`Switch to ${alternateWallpaper} wallpaper`}
			title={`Switch to ${alternateWallpaper} wallpaper`}
		>
			<Image
				src={previewSource}
				alt=""
				width={400}
				height={300}
				className="wallpaper-option__preview"
				unoptimized={previewSource.endsWith(".gif")}
			/>
		</button>
	);
}
