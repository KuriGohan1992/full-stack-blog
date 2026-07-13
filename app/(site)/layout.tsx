import type { ReactNode } from "react";

import { SiteShell } from "@/components/site-shell";

type SiteLayoutProps = Readonly<{
	children: ReactNode;
}>;

export default function SiteLayout({ children }: SiteLayoutProps) {
	return <SiteShell>{children}</SiteShell>;
}
