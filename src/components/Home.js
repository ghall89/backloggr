import { useState, useEffect } from 'react';
import { Box, Button, Tabs, Tab } from '@mui/material';
import { Add } from '@mui/icons-material';

import { addGame, getGames, deleteGame } from '../lib/games';
import { AddGameModal, ConfirmModal, GameTable } from './components';

const Home = () => {
	const [games, setGames] = useState();
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [selectedId, setSelectedId] = useState();
	const [openConfirm, setOpenConfirm] = useState(false);
	const [tabState, setTabState] = useState('new');

	const handleApi = () => {
		setTimeout(async () => {
			const data = await getGames();
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

	const handleTabs = (event, newValue) => setTabState(newValue);

	useEffect(() => {
		handleApi();
	}, []);

	return (
		<>
			<Box sx={{ width: '100%', padding: 4 }}>
				<Tabs value={tabState} onChange={handleTabs} centered>
					<Tab value="new" label="New" />
					<Tab value="in_progress" label="In Progress" />
					<Tab value="finipeted" label="Finished/Completed" />
					<Tab value="all" label="All" />
				</Tabs>
				<Box sx={{ marginBottom: 2 }}>
					<Button onClick={() => setOpenModal(true)} startIcon={<Add />}>
						Add Game
					</Button>
				</Box>
				<GameTable
					games={games}
					handleDelete={handleDelete}
					loading={loading}
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
