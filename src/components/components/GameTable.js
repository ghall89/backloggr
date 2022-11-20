import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Select,
	Skeleton,
} from '@mui/material';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';

import { updateGame } from '../../lib/games';

const StatusSelect = ({ row }) => {
	const { _id, status } = row;

	const [statusSelect, setStatusSelect] = useState(status);

	const handleChange = async event => {
		await setStatusSelect(event.target.value);
		await updateGame(
			`{"id":"${_id}","params":{"status": "${event.target.value}"}}`,
		);
	};

	return (
		<FormControl variant="standard">
			<Select
				labelId="demo-simple-select-standard-label"
				id="demo-simple-select-standard"
				value={statusSelect}
				onChange={handleChange}
				label="Status"
			>
				<MenuItem value="not_started">Not Started</MenuItem>
				<MenuItem value="in_progress">In Progress</MenuItem>
				<MenuItem value="finished">Finished</MenuItem>
				<MenuItem value="completed">Completed</MenuItem>
				<MenuItem value="abandoned">Abandoned</MenuItem>
			</Select>
		</FormControl>
	);
};

const GameTable = ({ games, handleDelete, loading }) => {
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
			field: 'platform',
			headerName: 'Platform',
			width: 100,
		},
		// 		{
		// 			field: 'status',
		// 			headerName: 'Status',
		// 			valueGetter: ({ row }) => {
		// 				let status = 'Not Started';
		// 				if (row.started) {
		// 					status = 'In Progress';
		// 				}
		// 				if (row.finished) {
		// 					status = 'Finished';
		// 				}
		// 				if (row.completed) {
		// 					status = 'Completed!';
		// 				}
		// 				if (row.abandoned) {
		// 					status = 'Abandoned';
		// 				}
		//
		// 				return status;
		// 			},
		// 		},
		{
			field: 'status',
			headerName: 'Status',
			renderCell: ({ row }) => <StatusSelect row={row} />,
			width: 130,
		},
	];

	return (
		<Box sx={{ height: 434 }}>
			{loading ? (
				<Skeleton animation="wave" height={434} />
			) : (
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

export default GameTable;
