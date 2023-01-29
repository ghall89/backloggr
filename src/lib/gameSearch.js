const gameSearch = async query => {
	const res = await fetch(
		`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${query}`,
	)
		.then(response => response.json())
		.catch(err => console.error(err));

	return res;
};

export default gameSearch;
