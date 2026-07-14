import type { ReactNode } from "react";

import "98.css";
import "./desktop.css";

type DesktopLayoutProps = Readonly<{
	children: ReactNode;
}>;

export default function DesktopLayout({ children }: DesktopLayoutProps) {
	return <div className="desktop-background">{children}</div>;
}
