import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "Chronicle",
		template: "%s | Chronicle",
	},
	description:
		"A personal blog for projects, programming notes, and collected resources.",
};

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
	const cookieStore = await cookies();

	const theme =
		cookieStore.get("chronicle-theme")?.value === "sky" ? "sky" : "paper";

	const wallpaper =
		cookieStore.get(
			theme === "sky" ? "chronicle-sky-wallpaper" : "chronicle-paper-wallpaper",
		)?.value ?? (theme === "sky" ? "stars" : "newspaper");

	return (
		<html lang="en" data-theme={theme} data-wallpaper={wallpaper}>
			<body>{children}</body>
		</html>
	);
}
