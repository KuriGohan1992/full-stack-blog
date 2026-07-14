"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
	getCurrentTheme,
	getStoredWallpaper,
	saveWallpaper,
	type Theme,
	type Wallpaper,
} from "@/lib/theme-storage";

export function WallpaperSwitcher() {
	const [isMounted, setIsMounted] = useState(false);
	const [theme, setTheme] = useState<Theme>("paper");
	const [wallpaper, setWallpaper] = useState<Wallpaper>("newspaper");

	useEffect(() => {
		function synchronizeWallpaper() {
			const currentTheme = getCurrentTheme();
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

		saveWallpaper(theme, nextWallpaper);

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
