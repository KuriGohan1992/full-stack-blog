"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { type AdminLoginState, loginAdmin } from "@/lib/actions/admin-auth";

type AdminLoginFormProps = Readonly<{
	onClose: () => void;
}>;

const initialState: AdminLoginState = {
	success: false,
};

export function AdminLoginForm({ onClose }: AdminLoginFormProps) {
	const router = useRouter();

	const [state, formAction, isPending] = useActionState(
		loginAdmin,
		initialState,
	);

	useEffect(() => {
		if (!state.success) {
			return;
		}

		onClose();
		router.refresh();
	}, [state.success, onClose, router]);

	return (
		<form action={formAction}>
			<div>
				<label
					htmlFor="admin-password"
					className="mb-1 block font-['Pixelated_MS_Sans_Serif',Arial,sans-serif] text-sm text-black"
				>
					Password:
				</label>

				<input
					id="admin-password"
					name="password"
					type="password"
					autoComplete="current-password"
					disabled={isPending}
					aria-invalid={state.error ? true : undefined}
					aria-describedby={state.error ? "admin-password-error" : undefined}
					className="h-8 w-full border-2 border-t-[#404040] border-r-white border-b-white border-l-[#404040] bg-white px-2 font-['Pixelated_MS_Sans_Serif',Arial,sans-serif] text-sm text-black outline-none disabled:bg-[#dfdfdf]"
				/>

				{state.error && (
					<p
						id="admin-password-error"
						className="mt-1 font-['Pixelated_MS_Sans_Serif',Arial,sans-serif] text-xs text-[#a00000]"
					>
						{state.error}
					</p>
				)}
			</div>

			<div className="mt-4 flex justify-end gap-2">
				<button
					type="submit"
					disabled={isPending}
					className="min-w-20 border-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] px-3 py-1 font-['Pixelated_MS_Sans_Serif',Arial,sans-serif] text-sm text-black hover:bg-[#d4d0c8] active:border-t-[#404040] active:border-r-white active:border-b-white active:border-l-[#404040] disabled:text-[#808080] disabled:[text-shadow:1px_1px_#fff]"
				>
					{isPending ? "Wait..." : "OK"}
				</button>

				<button
					type="button"
					onClick={onClose}
					disabled={isPending}
					className="min-w-20 border-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] px-3 py-1 font-['Pixelated_MS_Sans_Serif',Arial,sans-serif] text-sm text-black hover:bg-[#d4d0c8] active:border-t-[#404040] active:border-r-white active:border-b-white active:border-l-[#404040] disabled:text-[#808080]"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}
