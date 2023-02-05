import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import TwitchProvider from 'next-auth/providers/twitch';

const scopes = ['identify'].join(' ');

export default NextAuth({
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: { params: { scope: scopes } },
		}),
		TwitchProvider({
			clientId: process.env.TWITCH_CLIENT_ID,
			clientSecret: process.env.TWITCH_CLIENT_SECRET,
		}),
	],
	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user) {
				session.user.id = token.uid;
			}
			return session;
		},
		jwt: async ({ user, token }) => {
			if (user) {
				token.uid = user.id;
			}
			return token;
		},
	},
	session: {
		strategy: 'jwt',
	},
});
