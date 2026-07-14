import type { Metadata } from "next";
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

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang="en"
			data-theme="paper"
			data-wallpaper="newspaper"
			suppressHydrationWarning
		>
			<head>
				<script src="/theme-init.js" />
			</head>

			<body>{children}</body>
		</html>
	);
}
