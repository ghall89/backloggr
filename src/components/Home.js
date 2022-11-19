import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';

import { getGames, deleteGame } from '../lib/games';
import AddGameModal from './components/AddGameModal';
import ConformModal from './components/ConfirmModal';

const Home = () => {
	const [games, setGames] = useState();
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [selectedId, setSelectedId] = useState();
	const [openConfirm, setOpenConfirm] = useState(false);

	const handleApi = async () => {
		const data = await getGames();
		setGames(data);
		if (loading) {
			setLoading(false);
		}
	};

	const deleteAction = async () => {
		await deleteGame(selectedId);
		await handleApi();
	};

	const handleDelete = id => {
		setSelectedId(id);
		setOpenConfirm(true);
	};

	useEffect(() => {
		handleApi();
	}, []);

	const columns = [
		{
			field: 'icon',
			headerName: '',
			renderCell: row => (
				<Button
					startIcon={<Delete color="error" />}
					onClick={() => handleDelete(row.id)}
				/>
			),
			width: 70,
		},
		{
			field: 'title',
			headerName: 'Title',
			width: 250,
		},
		{
			field: 'publisher',
			headerName: 'Publisher',
			width: 150,
		},
		{
			field: 'genre',
			headerName: 'Genre',
			width: 100,
		},
		{
			field: 'platform',
			headerName: 'Platform',
			width: 100,
		},
	];

	return (
		<>
			<Box sx={{ height: 434, width: '100%', padding: 4 }}>
				<Box sx={{ marginBottom: 2 }}>
					<Button onClick={() => setOpenModal(true)} variant="contained">
						Add Game
					</Button>
				</Box>
				{loading ? null : (
					<DataGrid
						rows={games}
						columns={columns}
						pageSize={5}
						getRowId={row => row._id}
					/>
				)}
			</Box>
			<AddGameModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				handleApi={handleApi}
			/>
			<ConformModal
				open={openConfirm}
				setOpen={setOpenConfirm}
				confirmAction={deleteAction}
			/>
		</>
	);
};

export default Home;
