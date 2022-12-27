import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { Box, Button, ButtonGroup } from '@mui/material';
import { Add, List, ViewModule } from '@mui/icons-material';

import { useAppContext } from '../AppContext';

import { addGame, getGames, deleteGame, updateGame } from '../lib/games';
import {
	AddGameModal,
	AppBar,
	NavTabs,
	ConfirmModal,
	GameCards,
	GameList,
	LoadingOverlay,
} from './components';

const handleSorting = (a, b) => {
	var titleA = a.title.toUpperCase();
	var titleB = b.title.toUpperCase();
	return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
};

const Backlog = () => {
	const { data, status } = useSession();

	const { query } = useRouter();
	const { games, handleApi, loading } = useAppContext();

	const [filter, setFilter] = useState(query.tab || 'not_started');
	const [filteredGames, setFilteredGames] = useState();
	const [openModal, setOpenModal] = useState(false);
	const [viewMode, setViewMode] = useState('grid');

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

	const HandleView = () => {
		switch (viewMode) {
			case 'grid':
				return (
					<GameCards
						games={filteredGames?.sort((a, b) => handleSorting(a, b))}
						loading={loading}
						setStatus={setStatus}
					/>
				);
			case 'list':
				return (
					<GameList
						games={filteredGames?.sort((a, b) => handleSorting(a, b))}
						loading={loading}
						setStatus={setStatus}
					/>
				);
			default:
				return <h4>Error</h4>;
		}
	};

	return (
		<>
			{!status === 'authenticated' ? null : (
				<>
					<AppBar />
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
							paddingY: 8,
							paddingBottom: 12,
							paddingLeft: { xs: 0, md: 31 },
						}}
					>
						<Box
							sx={{
								margin: 2,
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Button onClick={() => setOpenModal(true)} startIcon={<Add />}>
								Add Game
							</Button>
							{/* <ButtonGroup
								variant="outlined"
								aria-label="outlined button group"
							>
								<Button
									variant={viewMode === 'grid' ? 'contained' : 'outlined'}
									onClick={() => setViewMode('grid')}
								>
									<ViewModule />
								</Button>
								<Button
									variant={viewMode === 'list' ? 'contained' : 'outlined'}
									onClick={() => setViewMode('list')}
								>
									<List />
								</Button>
							</ButtonGroup> */}
						</Box>
						<HandleView
							viewMode={viewMode}
							games={filteredGames}
							loading={loading}
						/>
					</Box>
					<AddGameModal
						openModal={openModal}
						setOpenModal={setOpenModal}
						addAction={addAction}
					/>
					<NavTabs setFilter={setFilter} />
				</>
			)}
			<LoadingOverlay loading={loading} />
		</>
	);
};

export default Backlog;
