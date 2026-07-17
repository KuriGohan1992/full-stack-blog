import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ThemeInitializer } from "@/components/theme-initializer";

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
			<body>
				<ThemeInitializer />

				{children}

				<Analytics />
			</body>
		</html>
	);
}
