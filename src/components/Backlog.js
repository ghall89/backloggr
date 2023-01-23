import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { Box, Button, ButtonGroup, Fab, useMediaQuery } from '@mui/material';
import { Add, List, ViewModule } from '@mui/icons-material';
import { useTheme } from '@mui/styles';

import { useAppContext } from '../AppContext';

import { counter } from '../lib/functions';
import { addGame, getGames, deleteGame, updateGame } from '../lib/games';
import {
	AddGameModal,
	AppBar,
	NavTabs,
	ConfirmModal,
	GameCards,
	LoadingOverlay,
} from './components';

const handleSorting = (a, b) => {
	var titleA = a.title.toUpperCase();
	var titleB = b.title.toUpperCase();
	return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
};

const Backlog = () => {
	const { data, status } = useSession();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const { query } = useRouter();
	const { games, handleApi, loading } = useAppContext();

	const [filter, setFilter] = useState(query.tab || 'not_started');
	const [title, setTitle] = useState('Backlog');
	const [filteredGames, setFilteredGames] = useState();
	const [openModal, setOpenModal] = useState(false);
	const [viewMode, setViewMode] = useState('grid');
	const [statusCounter, setStatusCounter] = useState({});

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

	useEffect(() => {
		switch (filter) {
			case 'not_started':
				setTitle('Backlog');
				break;
			case 'in_progress':
				setTitle('Playing');
				break;
			case 'finished':
				setTitle('Finished');
				break;
			case 'completed':
				setTitle('Completed');
				break;
		}
	});

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

	useEffect(() => {
		if (games) {
			const statusCounts = counter(games);
			setStatusCounter(statusCounts);
		}
	}, [games]);

	return (
		<>
			{!status === 'authenticated' ? null : (
				<>
					{data?.user.name ? (
						<Head>
							<title>{`Backloggr - ${
								data?.user.name.split(' ')[0]
							}'s Backlog`}</title>
						</Head>
					) : null}

					<Box
						sx={{
							width: '100%',
							paddingBottom: { xs: 22, md: 9 },
							paddingLeft: { xs: 0, md: 31 },
						}}
					>
						<AppBar title={title} />
						<Box
							sx={{
								margin: 2,
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Fab
								color="primary"
								aria-label="add game"
								onClick={() => setOpenModal(true)}
								variant={!isMobile ? 'extended' : null}
								sx={{
									position: 'fixed',
									right: 28,
									bottom: { xs: 120, md: 20 },
								}}
							>
								<Add />
								<Box sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>
									Add Game
								</Box>
							</Fab>
						</Box>
						<GameCards
							games={filteredGames?.sort((a, b) => handleSorting(a, b))}
							loading={loading}
							setStatus={setStatus}
						/>
					</Box>
					<AddGameModal openModal={openModal} setOpenModal={setOpenModal} />
					<NavTabs setFilter={setFilter} />
				</>
			)}
			<LoadingOverlay loading={loading} />
		</>
	);
};

export default Backlog;
