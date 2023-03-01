const handleIgdb = async (query, action) => {
	const res = await fetch(`/api/igdbApi?search=${query}&action=${action}`)
		.then((response) => response.json())
		.catch((err) => {
			throw err
		})

	return res
}

export default handleIgdb
