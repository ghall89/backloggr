const gameSearch = async query => {
	const res = await fetch(
		`http://api.rawg.io/api/games?key=3859c8c833894695b672a8a11303911a&search=${query}`,
	)
		.then(response => response.json())
		.catch(err => console.error(err));

	return res;
};

export { gameSearch };
