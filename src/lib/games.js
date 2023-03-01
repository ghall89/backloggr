const getGames = async (user_ref) => {
	const options = {
		method: 'GET',
		headers: {},
	}

	const res = await fetch(`/api/games?user_ref=${user_ref}`, options)
		.then((response) => response.json())
		.catch((err) => {
			throw err
		})

	return res.data
}

const getGame = async (user_ref, id) => {
	const url = `/api/games?user_ref=${user_ref}&id=${id}`

	const options = {
		method: 'GET',
		headers: {},
	}

	const res = await fetch(url, options)
		.then((response) => response.json())
		.catch((err) => {
			throw err
		})

	return res.data
}

const deleteGame = async (id) => {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: `{"id":"${id}"}`,
	}

	fetch('/api/games', options)
		.then((response) => response.json())
		.catch((err) => {
			throw err
		})
}

const addGame = async (body) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	}

	fetch('/api/games', options)
		.then((response) => response.json())
		.catch((err) => {
			throw err
		})
}

const updateGame = async (body) => {
	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	}

	fetch('/api/games', options)
		.then((response) => response.json())
		.catch((err) => {
			throw err
		})
}

export { getGames, getGame, deleteGame, addGame, updateGame }
