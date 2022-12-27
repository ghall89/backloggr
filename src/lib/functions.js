import Router, { useRouter } from 'next/router';

import { addGame, getGames, deleteGame, updateGame } from './games';

// get user's games
const handleApi = () => {
	setTimeout(async () => {
		const res = await getGames(data?.user.id);
		setGames(res);
		window.sessionStorage.setItem('games', JSON.stringify(res));
	}, 1000);
};

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
const setStatus = async (id, newStatus, replaying) => {
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

const counter = games => {
	let totals = {};

	const statusArr = ['not_started', 'in_progress', 'finished', 'completed'];

	statusArr.forEach(status => {
		let count = 0;
		games.forEach(game => {
			if (game.status === status) {
				count++;
			}
		});
		totals = { ...totals, [status]: count };
	});
	return totals;
};

export { starFilter, setStatus, counter };
