import "server-only";

import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "chronicle-admin-session";

function getRequiredEnvironmentVariable(name: string): string {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
}

export async function isAdmin(): Promise<boolean> {
	const cookieStore = await cookies();

	const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

	if (!sessionCookie) {
		return false;
	}

	const expectedSessionSecret = getRequiredEnvironmentVariable(
		"ADMIN_SESSION_SECRET",
	);

	return sessionCookie === expectedSessionSecret;
}

export async function createAdminSession(): Promise<void> {
	const cookieStore = await cookies();

	const sessionSecret = getRequiredEnvironmentVariable("ADMIN_SESSION_SECRET");

	cookieStore.set(ADMIN_SESSION_COOKIE, sessionSecret, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60 * 8,
	});
}

export async function deleteAdminSession(): Promise<void> {
	const cookieStore = await cookies();

	cookieStore.delete(ADMIN_SESSION_COOKIE);
}
