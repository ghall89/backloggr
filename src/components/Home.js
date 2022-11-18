import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';

import { getGames, deleteGame } from '../lib/games';

const Home = () => {
	const [games, setGames] = useState();
	const [loading, setLoading] = useState(true);

	const handleApi = async () => {
		const data = await getGames();
		setGames(data);
		setLoading(false);
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
					onClick={() => deleteGame(row.id)}
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
			width: 100,
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
		<Box sx={{ height: 400, width: '100%', padding: 4 }}>
			{loading ? null : (
				<DataGrid
					rows={games}
					columns={columns}
					pageSize={5}
					getRowId={row => row._id}
				/>
			)}
		</Box>
	);
};

export default Home;
