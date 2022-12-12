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
		AUTH0_SECRET: process.env.AUTH0_SECRET,
		AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
		AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
	},
};

module.exports = withPWA(nextConfig);
