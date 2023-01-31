export default async function handler(req, res) {
	const { method, body } = req;

	const clientId = process.env.TWITCH_CLIENT_ID;
	const secret = process.env.TWITCH_CLIENT_SECRET;

	let result;
	try {
		const auth = await fetch(
			`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secret}&grant_type=client_credentials`,
			{ method: 'POST' },
		);

		const { access_token } = await auth.json();

		const data = await fetch('https://api.igdb.com/v4/games', {
			method: 'POST',
			headers: {
				'Client-ID': clientId,
				Authorization: `Bearer ${access_token}`,
			},
			body: `search "${req.query.search}"; fields name,genres,platforms,cover;`,
		});

		result = await data.json();
	} catch (err) {
		res.status(400).json({
			success: false,
			data: err,
		});
	} finally {
		console.log(result);
		res.status(200).json(result);
	}
}
