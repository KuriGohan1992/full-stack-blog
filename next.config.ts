import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "http.cat",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
