import { useState, useEffect } from 'react';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';

import { addGame, getGames, deleteGame } from '../lib/games';
import { AddGameModal, ConfirmModal, GameTable } from './components';

const Home = () => {
	const [games, setGames] = useState();
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [selectedId, setSelectedId] = useState();
	const [openConfirm, setOpenConfirm] = useState(false);

	const handleApi = () => {
		if (!loading) {
			setLoading(true);
		}

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

	useEffect(() => {
		handleApi();
	}, []);

	return (
		<>
			{loading ? (
				<Backdrop
					sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
					open={true}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : (
				<Box sx={{ height: 434, width: '100%', padding: 4 }}>
					<Box sx={{ marginBottom: 2 }}>
						<Button onClick={() => setOpenModal(true)} variant="contained">
							Add Game
						</Button>
					</Box>
					<GameTable games={games} handleDelete={handleDelete} />
				</Box>
			)}

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
