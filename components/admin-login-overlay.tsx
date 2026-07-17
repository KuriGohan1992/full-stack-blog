"use client";

import { useCallback, useEffect, useState } from "react";

import { AdminLoginForm } from "@/components/admin-login-form";

export function AdminLoginOverlay() {
	const [isOpen, setIsOpen] = useState(false);

	const closeOverlay = useCallback(() => {
		setIsOpen(false);
	}, []);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		function closeWithEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				closeOverlay();
			}
		}

		document.addEventListener("keydown", closeWithEscape);

		return () => {
			document.removeEventListener("keydown", closeWithEscape);
		};
	}, [isOpen, closeOverlay]);

	return (
		<>
			<button
				type="button"
				onClick={() => {
					setIsOpen(true);
				}}
				className="site-link mt-2 cursor-pointer border-0 bg-transparent p-0 underline"
			>
				Admin sign in
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<button
						type="button"
						aria-label="Close admin login"
						onClick={closeOverlay}
						className="absolute inset-0 cursor-default bg-black/40"
					/>

					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="admin-login-title"
						className="relative z-10 w-full max-w-90 border-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] p-[3px] shadow-[5px_5px_0_rgb(0_0_0/35%)]"
					>
						<header className="flex h-7 items-center justify-between bg-[#000080] px-1.5 text-white">
							<h2
								id="admin-login-title"
								className="font-['Pixelated_MS_Sans_Serif',Arial,sans-serif] text-sm font-bold"
							>
								Chronicle
							</h2>

							<button
								type="button"
								onClick={closeOverlay}
								aria-label="Close admin login"
								className="flex size-5 items-center justify-center border-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] font-sans text-sm font-bold leading-none text-black active:border-t-[#404040] active:border-r-white active:border-b-white active:border-l-[#404040]"
							>
								×
							</button>
						</header>

						<div className="px-4 py-4">
							<div className="mb-2 flex justify-center items-center gap-3">
								<p className="font-['Pixelated_MS_Sans_Serif',Arial,sans-serif] text-lg font-bold text-black">
									Administrator Access
								</p>
							</div>

							<AdminLoginForm onClose={closeOverlay} />
						</div>
					</section>
				</div>
			)}
		</>
	);
}
