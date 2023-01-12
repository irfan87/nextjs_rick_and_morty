const nextConfig = {
	reactStrictMode: true,
	images: {
		loader: "custom",
		path: "/",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "rickandmortyapi.com",

				// pathname: "/avatar/**",
			},
		],
	},
};

module.exports = nextConfig;
