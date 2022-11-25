import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Router from 'next/router';

import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

import { addGame, getGames, deleteGame } from '../lib/games';
import { AddGameModal, AppBar, ConfirmModal, GameList } from './components';

const Backlog = () => {
	const { user } = useUser();

	const [games, setGames] = useState();
	const [filter, setFilter] = useState('not_started');
	const [filteredGames, setFilteredGames] = useState();
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);

	const handleApi = () => {
		setTimeout(async () => {
			const data = await getGames(user.sub);
			setGames(data);
			window.sessionStorage.setItem('games', JSON.stringify(data));
			setLoading(false);
		}, 1000);
	};

	const addAction = async submitBody => {
		await addGame(submitBody);
		await handleApi();
	};

	useEffect(() => {
		const session = window.sessionStorage.getItem('games');

		if (session) {
			setGames(JSON.parse(session));
			return;
		}

		if (user) {
			handleApi();
		}
	}, [user]);

	useEffect(() => {
		if (games) {
			if (filter === 'all') {
				setFilteredGames(games);
			} else {
				const filteredArr = [];
				games.forEach(game => {
					if (game.status.includes(filter)) {
						filteredArr.push(game);
					}
				});
				setFilteredGames(filteredArr);
			}
		}
	}, [games, filter]);

	return (
		<>
			{!user ? null : (
				<>
					<AppBar />
					<Box sx={{ width: '100%', paddingTop: 4 }}>
						<Box sx={{ marginBottom: 2 }}>
							<Button onClick={() => setOpenModal(true)} startIcon={<Add />}>
								Add Game
							</Button>
						</Box>

						<GameList
							games={filteredGames}
							handleDelete={handleDelete}
							setFilter={setFilter}
							handleApi={handleApi}
						/>
					</Box>

					<AddGameModal
						openModal={openModal}
						setOpenModal={setOpenModal}
						addAction={addAction}
					/>
				</>
			)}
		</>
	);
};

export default Backlog;
