(() => {
	let theme = "paper";
	let wallpaper = "newspaper";

	try {
		const storedTheme = window.localStorage.getItem("chronicle-theme");

		theme = storedTheme === "sky" ? "sky" : "paper";

		const wallpaperKey =
			theme === "sky" ? "chronicle-sky-wallpaper" : "chronicle-paper-wallpaper";

		const storedWallpaper = window.localStorage.getItem(wallpaperKey);

		if (theme === "sky") {
			wallpaper = storedWallpaper === "electric" ? "electric" : "stars";
		} else {
			wallpaper = storedWallpaper === "paper" ? "paper" : "newspaper";
		}
	} catch {
		theme = "paper";
		wallpaper = "newspaper";
	}

	document.documentElement.dataset.theme = theme;
	document.documentElement.dataset.wallpaper = wallpaper;
})();
