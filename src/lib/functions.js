import Router from 'next/router'

import { deleteGame, updateGame } from './games'

// filter game by starred status
const starFilter = (games, bool) => {
	const arr = []
	games?.forEach((game) => {
		if (game.starred === bool) {
			arr.push(game)
		}
	})
	return arr
}

// set play status of game
const setStatus = async (id, newStatus, replaying, handleApi) => {
	const params = {
		id,
		params: {
			status: newStatus,
		},
	}

	const currentDateTime = new Date().toUTCString()

	if (!replaying) {
		params.params = { ...params.params, updated: currentDateTime }
	} else {
		params.params = {
			...params.params,
			updated: currentDateTime,
			replaying: true,
		}
	}

	await updateGame(JSON.stringify(params))
	window.sessionStorage.clear()
	handleApi()
	Router.push('/')
}

const setStarStatus = async (bool, id, game, setGame, handleApi) => {
	setGame({ ...game, starred: bool })
	await updateGame(`{"id":"${id}","params":{"starred": "${bool}"}}`)
	handleApi()
	window.sessionStorage.clear()
}

const deleteAction = async (id, handleApi) => {
	await deleteGame(id)
	await window.sessionStorage.clear()
	handleApi()
	Router.push('/')
}

// Export user's data as a JSON file
const exportJson = (username, obj) => {
	const filename = `${username}s-backlog-data.json`
	const jsonStr = JSON.stringify(obj)

	const element = document.createElement('a')
	element.setAttribute(
		'href',
		`data:text/plain;charset=utf-8,${encodeURIComponent(jsonStr)}`
	)
	element.setAttribute('download', filename)

	element.style.display = 'none'
	document.body.appendChild(element)

	element.click()

	document.body.removeChild(element)
}

export { exportJson, setStatus, starFilter, deleteAction, setStarStatus }
