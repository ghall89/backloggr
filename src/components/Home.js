import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

import { addGame, getGames, deleteGame } from '../lib/games';
import { AddGameModal, ConfirmModal, GameTable } from './components';

const Home = () => {
	const [games, setGames] = useState();
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [selectedId, setSelectedId] = useState();
	const [openConfirm, setOpenConfirm] = useState(false);
	const [filter, setFilter] = useState('not_started');

	const handleApi = () => {
		setTimeout(async () => {
			const data = await getGames(filter);
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
		handleApi();
	}, [filter]);

	return (
		<>
			<Box sx={{ width: '100%', padding: 4 }}>
				<Box sx={{ marginBottom: 2 }}>
					<Button onClick={() => setOpenModal(true)} startIcon={<Add />}>
						Add Game
					</Button>
				</Box>
				<GameTable
					games={games}
					handleDelete={handleDelete}
					loading={loading}
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
	);
};

export default Home;
