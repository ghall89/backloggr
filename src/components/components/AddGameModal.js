import { useState } from 'react';
import { Box, Button, Dialog, TextField } from '@mui/material';

const AddGameModal = ({ openModal, setOpenModal, addAction }) => {
	const [title, setTitle] = useState('');
	const [platform, setPlatform] = useState('');

	const handleSubmit = async () => {
		const submitBody = {
			title,
			platform,
			status: 'not_started',
		};
		await addAction(submitBody);
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
