"use client";

import Image from "next/image";
import { useEffect } from "react";

type AppErrorProps = Readonly<{
	error: Error & {
		digest?: string;
	};
	reset: () => void;
}>;

export default function AppError({ error, reset }: AppErrorProps) {
	useEffect(() => {
		console.error("Application error:", error);
	}, [error]);

	return (
		<main className="fixed inset-0 z-50 overflow-y-auto bg-black text-white">
			<div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col items-center px-4 py-4 text-center sm:px-8">
				<p className="mb-3 w-full text-right font-mono text-sm tracking-[0.15em] text-neutral-300 sm:text-base">
					http.cat/500
				</p>

				<Image
					src="https://http.cat/500"
					alt="HTTP 500 Internal Server Error"
					width={750}
					height={600}
					priority
					className="h-auto w-full object-contain"
				/>

				<button
					type="button"
					onClick={reset}
					className="mt-5 min-w-32 cursor-pointer border-t-2 border-r-2 border-b-2 border-l-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] px-4 py-2 font-sans text-sm font-bold text-black hover:bg-[#d4d4d4] active:border-t-[#404040] active:border-r-white active:border-b-white active:border-l-[#404040] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
				>
					Try Again
				</button>
			</div>
		</main>
	);
}
