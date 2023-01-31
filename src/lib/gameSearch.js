const gameSearch = async query => {
	const res = await fetch(`/api/igdbApi?search=${query}`)
		.then(response => response.json())
		.catch(err => console.error(err));

	return res;
};

export default gameSearch;
