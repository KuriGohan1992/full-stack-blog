import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const themeInitializationScript = `
	(() => {
		try {
			const savedTheme = window.localStorage.getItem("chronicle-theme");

			document.documentElement.dataset.theme =
				savedTheme === "lightning"
					? "lightning"
					: "parchment";
		} catch {
			document.documentElement.dataset.theme = "parchment";
		}
	})();
`;

export const metadata: Metadata = {
	title: {
		default: "Chronicle",
		template: "%s | Chronicle",
	},
	description:
		"A personal chronicle of writing, projects, resources, and internet curiosities.",
};

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang="en"
			data-theme="parchment"
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable} h-full`}
		>
			<head>
				<Script
					id="chronicle-theme-initialization"
					strategy="beforeInteractive"
				>
					{themeInitializationScript}
				</Script>
			</head>

			<body className="min-h-full">{children}</body>
		</html>
	);
}
