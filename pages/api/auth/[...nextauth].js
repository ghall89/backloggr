import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

// supposedly this will fix the timeout issue
require('mongodb');

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_TOKEN,
			clientSecret: process.env.GITHUB_SECRET,
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
