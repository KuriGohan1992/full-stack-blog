import Image from "next/image";

export function SiteLogo() {
	return (
		<header className="py-1 text-center">
			<h1 className="sr-only">Chronicle</h1>

			<Image
				src="/titles/chronicle-wordart.png"
				alt=""
				width={700}
				height={220}
				priority
				className="logo-parchment mx-auto h-auto w-full max-w-[560px]"
			/>

			<Image
				src="/titles/chronicle-ice.png"
				alt=""
				width={500}
				height={150}
				priority
				className="logo-lightning mx-auto h-auto w-full max-w-[430px]"
			/>
		</header>
	);
}
