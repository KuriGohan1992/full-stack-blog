import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="fixed inset-0 z-50 overflow-y-auto bg-black text-white">
			<div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col items-center px-4 py-4 text-center sm:px-8">
				<p className="mb-3 w-full text-right font-mono text-sm tracking-[0.15em] text-neutral-300 sm:text-base">
					http.cat/404
				</p>

				<Image
					src="https://http.cat/404"
					alt="HTTP 404 Not Found"
					width={750}
					height={600}
					priority
					className="h-auto w-full object-contain"
				/>

				<div className="mt-5 flex flex-wrap justify-center gap-3">
					<Link
						href="/"
						className="inline-flex min-w-32 items-center justify-center border-t-2 border-r-2 border-b-2 border-l-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] px-4 py-2 font-sans text-sm font-bold text-black no-underline hover:bg-[#d4d4d4] active:border-t-[#404040] active:border-r-white active:border-b-white active:border-l-[#404040] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					>
						Go Home
					</Link>

					<Link
						href="/blog"
						className="inline-flex min-w-32 items-center justify-center border-t-2 border-r-2 border-b-2 border-l-2 border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#c0c0c0] px-4 py-2 font-sans text-sm font-bold text-black no-underline hover:bg-[#d4d4d4] active:border-t-[#404040] active:border-r-white active:border-b-white active:border-l-[#404040] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					>
						View Blog
					</Link>
				</div>
			</div>
		</main>
	);
}
