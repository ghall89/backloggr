import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import {
	Box,
	Button,
	Dialog,
	InputLabel,
	ListSubheader,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

import { currentPlatformList, oldPlatformList } from '../../lib/platformList';

const AddGameModal = ({ openModal, setOpenModal, addAction }) => {
	const { user } = useUser();

	const [title, setTitle] = useState(null);
	const [platform, setPlatform] = useState(null);

	const handleSubmit = async () => {
		if (title && platform) {
			const submitBody = {
				title,
				platform,
				status: 'not_started',
				user_ref: user.sub,
			};
			await addAction(submitBody);
			setTitle(null);
			setPlatform(null);
			setOpenModal(false);
		}
	};

	const handleChange = async event => await setPlatform(event.target.value);

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
				<InputLabel id="platform-label">Platform</InputLabel>
				<Select
					labelId="platform-label"
					id="platform-select"
					value={platform}
					label="Platform"
					onChange={handleChange}
				>
					{currentPlatformList.sort().map(val => (
						<MenuItem key={val} value={val}>
							{val}
						</MenuItem>
					))}
					<ListSubheader>Other Platforms</ListSubheader>
					{oldPlatformList.sort().map(val => (
						<MenuItem key={val} value={val}>
							{val}
						</MenuItem>
					))}
				</Select>
				<Button onClick={() => handleSubmit()} variant="contained">
					Submit
				</Button>
			</Box>
		</Dialog>
	);
};

export default AddGameModal;
