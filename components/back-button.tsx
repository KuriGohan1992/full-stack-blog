"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
	const router = useRouter();

	return (
		<div className="flex justify-start">
			<button
				type="button"
				onClick={() => {
					router.back();
				}}
				aria-label="Go back"
				title="Back"
				className="flex size-8 items-center justify-center border-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] p-0 text-black hover:bg-[#d4d0c8] active:border-t-[#404040] active:border-r-white active:border-b-white active:border-l-[#404040]"
			>
				<span className="text-lg leading-none">↩</span>
			</button>
		</div>
	);
}
