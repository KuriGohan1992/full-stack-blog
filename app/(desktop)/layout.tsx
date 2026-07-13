import type { ReactNode } from "react";

type DesktopLayoutProps = Readonly<{
	children: ReactNode;
}>;

export default function DesktopLayout({ children }: DesktopLayoutProps) {
	return <div className="desktop-background">{children}</div>;
}
