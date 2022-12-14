/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['s.gravatar.com', 'media.rawg.io', 'cdn.discordapp.com'],
	},
	env: {
		MONGODB_URI: process.env.MONGODB_URI,
		RAWG_API_KEY: process.env.RAWG_API_KEY,
		DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
		DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	},
};

module.exports = nextConfig;
