![](./backloggr_logo.png)

![](https://img.shields.io/github/package-json/v/ghall89/backloggr?style=flat-square) ![](https://img.shields.io/netlify/b56fde21-6856-462e-ac6b-7a2e35fb6db3?style=flat-square) ![](https://img.shields.io/github/license/ghall89/backloggr?style=flat-square) ![](https://img.shields.io/github/commit-activity/m/ghall89/backloggr?style=flat-square) ![](https://img.shields.io/github/stars/ghall89/backloggr?style=flat-square) ![](https://img.shields.io/github/forks/ghall89/backloggr?style=flat-square)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T66ELM7)

## About

The mission behind Backloggr is a simple one: to provide a free, open-source tool to manage your gaming backlog.

Unlike other backlogging services, Backloggr gives you the opportunity to own your data by making it easy to export your entire backlog to a JSON file. Also, the license allows you to fork and deploy to any hosting service that supports web apps built with [Next.js](https://nextjs.org/) (I suggest [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/)), and connect to a database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

![](./screenshot.png)

## Using Backloggr

The easiest way to use Backloggr is to visit [Backloggr.net](https://backloggr.net), and sign in with your Discord account.

### Installing PWA

Backloggr is a PWA, or Progressive Web App, which you can install in Chrome, or on your mobile device.

## Deploying Your Own Version

To deploy your own version of Backloggr, you will need the following:

- Familiarity with Next.js or React
- A hosting provider like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/)
- An account with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)\*
- An API key from [RAWG API](https://api.rawg.io/docs/)\*
- A developer key from [Discord](https://discord.com/developers)\*

\* Feel free to modify your fork to use other alternatives, but these are what Backloggr is built around.

You will need to supply the following environmental variables in your environment:

- `MONGODB_URI` - Authenticated URL to your MongoDB database
- `RAWG_API_KEY` - Your unique API key from RAWG API
- `NEXTAUTH_SECRET` - A random, cryptographically strong key for authenticating with NextAuth
- `NEXTAUTH_URL` - The URL that NextAuth should redirect to when a user has logged in
- `DISCORD_CLIENT_ID` - Your app ID from Discord
- `DISCORD_CLIENT_SECRET` - A random, cryptographically strong key for authenticating with Discord

## FAQs

Q: I added/updated/deleted a game on my phone and it's not showing up on my computer. What's up with that?

A: To improve performance, and limit calls to the database, Backloggr uses session storage to temporarily cache your data inside your browser. This is only synced with the server when you change data locally. You can clear local storage by closing the tab running Backloggr. If you're running Backloggr as a PWA on your mobile device, you can achieve the same thing by force force-quitting the app.

Q: Why do I need a Discord account to register/log in?

A: Backloggr is (at the moment) a solo project, and I'm not comfortable storing personal information like emails and passwords. I wanted to use a third-party login system and Discord seemed like the obvious choice for a gaming-focused app. I do want to add more login methods in the future, but it will involve better account management on my end (which is coming down the road).

Q. Can I follow my friends' gaming lists, or share my own?

A: Right now, social features are not a priority. However, in the future I would like to add the ability to share your backlog with others via a public link. That will probably have to come after the improved account system.

Q: I'm trying to add [your game here] to my backlog, but it's not showing up for my platform, or at all. What gives?

A: I've run into this a lot, especially with smaller releases, and it is very annoying. Backloggr uses the [RAWG API](https://rawg.io/apidocs) to pull game data, so if something is missing or inaccurate it's an issue on that end. Unfortunately, the only way to fix this is by trying to edit the game at [rawg.io](https://rawg.io), which I've had mixes results with.

## License

Backloggr

Copyright (C) 2022-2023 Graham Hall

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

## Questions

If you have any questions, concerns, comments, etc., feel free to [reach out to me on Mastodon](https://home.social/@ghalldev).
