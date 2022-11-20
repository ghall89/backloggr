const getGames = async filter => {
	let url;
	if (filter === 'all') {
		url = '/api/games';
	} else {
		url = `/api/games?filter=${filter}`;
	}

	const options = {
		method: 'GET',
		headers: {
			cookie:
				'connect.sid=s%253AKG1f8FUH6-ihvYiNbuSPRtDW8BgXm5vv.Wzc0xz%252B8s0gphKkENvjqSEglQUVAcdE4eD2xUiMalHI',
		},
	};

	const res = await fetch(url, options)
		.then(response => response.json())
		.catch(err => console.error(err));

	return res.data;
};

const deleteGame = async id => {
	const options = {
		method: 'DELETE',
		headers: {
			cookie:
				'connect.sid=s%253AKG1f8FUH6-ihvYiNbuSPRtDW8BgXm5vv.Wzc0xz%252B8s0gphKkENvjqSEglQUVAcdE4eD2xUiMalHI',
			'Content-Type': 'application/json',
		},
		body: `{"id":"${id}"}`,
	};

	fetch('/api/games', options)
		.then(response => response.json())
		.catch(err => console.error(err));
};

const addGame = async body => {
	const options = {
		method: 'POST',
		headers: {
			cookie:
				'connect.sid=s%253AKG1f8FUH6-ihvYiNbuSPRtDW8BgXm5vv.Wzc0xz%252B8s0gphKkENvjqSEglQUVAcdE4eD2xUiMalHI',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	};

	fetch('/api/games', options)
		.then(response => response.json())
		.catch(err => console.error(err));
};

const updateGame = async body => {
	const options = {
		method: 'PUT',
		headers: {
			cookie:
				'connect.sid=s%253AKG1f8FUH6-ihvYiNbuSPRtDW8BgXm5vv.Wzc0xz%252B8s0gphKkENvjqSEglQUVAcdE4eD2xUiMalHI',
			'Content-Type': 'application/json',
		},
		body,
	};

	fetch('/api/games', options)
		.then(response => response.json())
		.catch(err => console.error(err));
};

export { getGames, deleteGame, addGame, updateGame };
