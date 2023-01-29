import Router, { useRouter } from 'next/router';

import { useAppContext } from '../AppContext';

import { addGame, getGames, deleteGame, updateGame } from './games';

// // get user's games
// const handleApi = () => {
// 	setTimeout(async () => {
// 		const res = await getGames(data?.user.id);
// 		setGames(res);
// 		window.sessionStorage.setItem('games', JSON.stringify(res));
// 	}, 1000);
// };

// filter game by starred status
const starFilter = (games, bool) => {
	const arr = [];
	games.forEach(game => {
		if (game.starred === bool) {
			arr.push(game);
		}
	});
	return arr;
};

// set play status of game
const setStatus = async (id, newStatus, replaying, handleApi) => {
	let params = {
		id: id,
		params: {
			status: newStatus,
		},
	};

	const currentDateTime = new Date().toUTCString();

	if (!replaying) {
		params.params = { ...params.params, updated: currentDateTime };
	} else {
		params.params = {
			...params.params,
			updated: currentDateTime,
			replaying: true,
		};
	}

	await updateGame(JSON.stringify(params));
	window.sessionStorage.clear();
	handleApi();
	Router.push(`/backlog?tab=${newStatus}`);
};

const setStarStatus = async (bool, id, game, setGame, handleApi) => {
	setGame({ ...game, starred: bool });
	await updateGame(`{"id":"${id}","params":{"starred": "${bool}"}}`);
	handleApi();
	window.sessionStorage.clear();
};

const deleteAction = async (id, handleApi) => {
	await deleteGame(id);
	await window.sessionStorage.clear();
	handleApi();
	Router.push('/backlog');
};

// Export user's data as a JSON file
const exportJson = (username, obj) => {
	const filename = `${username}s-backlog-data.json`;
	const jsonStr = JSON.stringify(obj);

	let element = document.createElement('a');
	element.setAttribute(
		'href',
		'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr),
	);
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
};

// sort games by
const handleSorting = (a, b) => {
	var titleA = a.title.toUpperCase();
	var titleB = b.title.toUpperCase();
	return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
};

export { exportJson, setStatus, starFilter, deleteAction, setStarStatus };
