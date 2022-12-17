const withPWA = require('next-pwa')({
	dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['s.gravatar.com', 'media.rawg.io'],
	},
	env: {
		MONGODB_URI: process.env.MONGODB_URI,
		RAWG_API_KEY: process.env.RAWG_API_KEY,
		GITHUB_TOKEN: process.env.GITHUB_TOKEN,
		GITHUB_SECRET: process.env.GITHUB_SECRET,
	},
};

module.exports = withPWA(nextConfig);
