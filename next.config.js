/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		MONGO_DB: process.env.MONGO_DB,
		RAWG_API_KEY: process.env.RAWG_API_KEY,
	},
};

module.exports = nextConfig;
