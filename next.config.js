/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		MONGO_DB: process.env.MONGO_DB,
	},
};

module.exports = nextConfig;
