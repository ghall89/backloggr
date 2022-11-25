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
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [selectedId, setSelectedId] = useState();
	const [openConfirm, setOpenConfirm] = useState(false);
	const [filter, setFilter] = useState('not_started');

	const handleApi = () => {
		setTimeout(async () => {
			const data = await getGames(user.sub, filter);
			setGames(data);

			setLoading(false);
		}, 1000);
	};

	const deleteAction = async () => {
		await deleteGame(selectedId);
		await handleApi();
	};

	const handleDelete = id => {
		setSelectedId(id);
		setOpenConfirm(true);
	};

	const addAction = async submitBody => {
		await addGame(submitBody);
		await handleApi();
	};

	useEffect(() => {
		if (user) {
			handleApi();
		}
	}, [filter, user]);

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
							games={games}
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
					<ConfirmModal
						open={openConfirm}
						setOpen={setOpenConfirm}
						confirmAction={deleteAction}
					/>
				</>
			)}
		</>
	);
};

export default Backlog;
