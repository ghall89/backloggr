import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Select,
	Skeleton,
	Tab,
	Tabs,
} from '@mui/material';
import { useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';

import { updateGame } from '../../lib/games';

const StatusSelect = ({ row, handleApi }) => {
	const { _id, status } = row;

	const [statusSelect, setStatusSelect] = useState(status);

	const handleChange = async event => {
		await setStatusSelect(event.target.value);
		await updateGame(
			`{"id":"${_id}","params":{"status": "${event.target.value}"}}`,
		);
		await handleApi();
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

const GameTable = ({ games, handleDelete, loading, setFilter, handleApi }) => {
	const [tabState, setTabState] = useState('not_started');

	const handleTabs = (event, newValue) => {
		setTabState(newValue);
		setFilter(newValue);
	};

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
		{
			field: 'status',
			headerName: 'Status',
			renderCell: ({ row }) => <StatusSelect row={row} handleApi={handleApi} />,
			width: 130,
		},
	];

	return (
		<>
			<Tabs value={tabState} onChange={handleTabs} centered>
				<Tab value="not_started" label="New" />
				<Tab value="in_progress" label="In Progress" />
				<Tab value="finished" label="Finished" />
				<Tab value="completed" label="Completed" />
				<Tab value="all" label="All" />
			</Tabs>
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
		</>
	);
};

export default GameTable;
