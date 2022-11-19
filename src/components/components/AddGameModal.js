import { useState } from 'react';
import { Box, Button, Dialog, TextField } from '@mui/material';

import { addGame } from '../../lib/games';
import { gameSearch } from '../../lib/rawgApi';

const AddGameModal = ({ openModal, setOpenModal, handleApi }) => {
	const [query, setQuery] = useState('');

	const handleSearch = async () => {
		const res = await gameSearch(query);
	};
	//
	// 	const handleSubmit = async () => {
	// 		const submitBody = { title, genre, publisher, platform };
	// 		await addGame(submitBody);
	// 		await handleApi();
	// 		setOpenModal(false);
	// 	};

	return (
		<Dialog onClose={() => setOpenModal(false)} open={openModal}>
			<Box
				sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 1 }}
			>
				<TextField
					onChange={({ target }) => setQuery(target.value)}
					label="Title"
					variant="outlined"
				/>
				<Button onClick={() => handleSearch()} variant="contained">
					Search
				</Button>
			</Box>
		</Dialog>
	);
};

export default AddGameModal;
