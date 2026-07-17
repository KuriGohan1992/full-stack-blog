"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
	createAdminSession,
	deleteAdminSession,
} from "@/lib/auth/admin-session";

const loginSchema = z.object({
	password: z.string().min(1, "Enter the admin password."),
});

export type AdminLoginState = Readonly<{
	success: boolean;
	error?: string;
}>;

export async function loginAdmin(
	_previousState: AdminLoginState,
	formData: FormData,
): Promise<AdminLoginState> {
	const parsed = loginSchema.safeParse({
		password: formData.get("password"),
	});

	if (!parsed.success) {
		return {
			success: false,
			error: parsed.error.flatten().fieldErrors.password?.[0],
		};
	}

	const expectedPassword = process.env.ADMIN_PASSWORD;

	if (!expectedPassword) {
		throw new Error("Missing required environment variable: ADMIN_PASSWORD");
	}

	if (parsed.data.password !== expectedPassword) {
		return {
			success: false,
			error: "Incorrect password.",
		};
	}

	await createAdminSession();

	revalidatePath("/", "layout");

	return {
		success: true,
	};
}

export async function logoutAdmin(): Promise<void> {
	await deleteAdminSession();

	redirect("/");
}
