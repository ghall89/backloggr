const getParams = (search, action) => {
	let url;
	let params;

	switch (action) {
		case 'searchGames':
			url = 'https://api.igdb.com/v4/games';
			params = `search "${search}"; fields name,genres.name,platforms.name,cover.image_id; where category = 0;`;
			break;
		case 'gameById':
			url = 'https://api.igdb.com/v4/games';
			params = `where id = "${search}"; fields name,genres.name,platforms.name,cover.image_id; where category = 0;`;
			break;
		case 'coverById':
			url = 'https://api.igdb.com/v4/covers';
			params = `where game = (${search}); fields *;`;
			break;
	}

	return { url, params };
};

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

		const { url, params } = await getParams(req.query.search, req.query.action);

		console.log(url, params);

		const data = await fetch(url, {
			method: 'POST',
			headers: {
				'Client-ID': clientId,
				Authorization: `Bearer ${access_token}`,
			},
			body: params,
		});

		result = await data.json();
	} catch (err) {
		console.error(err);
	} finally {
		console.log(result);
		res.status(200).json(result);
	}
}
