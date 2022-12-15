import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

import { useAppContext } from '../AppContext';

import { addGame, getGames, deleteGame } from '../lib/games';
import {
	AddGameModal,
	AppBar,
	BottomTabs,
	ConfirmModal,
	GameList,
	LoadingOverlay,
} from './components';

const handleSorting = (a, b) => {
	var titleA = a.title.toUpperCase();
	var titleB = b.title.toUpperCase();
	return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
};

const Backlog = () => {
	const { query } = useRouter();
	const { games, handleApi, loading, user } = useAppContext();

	const [filter, setFilter] = useState(query.tab || 'not_started');
	const [filteredGames, setFilteredGames] = useState();
	const [openModal, setOpenModal] = useState(false);

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

	const addAction = async submitBody => {
		games.forEach(game => {
			if (game.rawg_id === submitBody.rawg_id) {
				alert('This game is already in your backlog!');
				return;
			}
		});
		await addGame(submitBody);
		await handleApi();
	};

	return (
		<>
			{!user ? null : (
				<>
					<Head>
						<title>{`Backloggr - ${user.nickname}'s Backlog`}</title>
					</Head>

					<Box sx={{ width: '100%', paddingY: 8, paddingBottom: 12 }}>
						<Box sx={{ margin: 2 }}>
							<Button onClick={() => setOpenModal(true)} startIcon={<Add />}>
								Add Game
							</Button>
						</Box>

						<GameList
							games={filteredGames?.sort((a, b) => handleSorting(a, b))}
							loading={loading}
						/>
					</Box>
					<AddGameModal
						openModal={openModal}
						setOpenModal={setOpenModal}
						addAction={addAction}
					/>
				</>
			)}
			<BottomTabs setFilter={setFilter} />
			<LoadingOverlay loading={loading} />
		</>
	);
};

export default Backlog;
