import { useState } from 'react';
import { Box, Button, Dialog, TextField } from '@mui/material';

import { addGame } from '../../lib/games';

const AddGameModal = ({ openModal, setOpenModal, handleApi }) => {
	const [title, setTitle] = useState('');
	const [genre, setGenre] = useState('');
	const [publisher, setPublisher] = useState('');
	const [platform, setPlatform] = useState('');

	const handleSubmit = async () => {
		const submitBody = { title, genre, publisher, platform };
		await addGame(submitBody);
		await handleApi();
		setOpenModal(false);
	};

	return (
		<Dialog onClose={() => setOpenModal(false)} open={openModal}>
			<Box
				sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 1 }}
			>
				<TextField
					onChange={({ target }) => setTitle(target.value)}
					label="Title"
					variant="outlined"
				/>
				<TextField
					onChange={({ target }) => setGenre(target.value)}
					label="Genre"
					variant="outlined"
				/>
				<TextField
					onChange={({ target }) => setPublisher(target.value)}
					label="Publisher"
					variant="outlined"
				/>
				<TextField
					onChange={({ target }) => setPlatform(target.value)}
					label="Platform"
					variant="outlined"
				/>
				<Button onClick={() => handleSubmit()} variant="contained">
					Submit
				</Button>
			</Box>
		</Dialog>
	);
};

export default AddGameModal;
