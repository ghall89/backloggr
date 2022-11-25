import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import Router from 'next/router';

import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';

import { getGame, deleteGame, updateGame } from '../lib/games';
import { AppBar, ConfirmModal } from './components';

const Game = ({ id }) => {
	const { user } = useUser();

	const [openConfirm, setOpenConfirm] = useState(false);
	const [loading, setLoading] = useState(true);
	const [game, setGame] = useState();
	const [statusSelect, setStatusSelect] = useState();

	const handleApi = async () => {
		const session = await JSON.parse(window.sessionStorage.getItem('games'));
		if (session) {
			session.forEach(item => {
				if (item._id.includes(id)) {
					setGame(item);
				}
			});
		} else {
			const data = await getGame(user.sub, id);
			setGame(data[0]);
		}

		setLoading(false);
	};

	const setStatus = async newStatus => {
		await updateGame(`{"id":"${id}","params":{"status": "${newStatus}"}}`);
		window.sessionStorage.clear();
		Router.push('/backlog');
	};

	const deleteAction = async () => {
		await deleteGame(id);
		window.sessionStorage.clear();
		Router.push('/backlog');
	};

	const handleDelete = () => setOpenConfirm(true);

	useEffect(() => {
		if (user) {
			handleApi();
		}
	}, [user]);

	const StatusButton = ({ status }) => {
		switch (status) {
			case 'not_started':
				return (
					<Button
						fullWidth
						variant="contained"
						onClick={() => setStatus('in_progress')}
					>
						Mark as Started
					</Button>
				);
			case 'in_progress':
				return (
					<Button
						fullWidth
						variant="contained"
						onClick={() => setStatus('finished')}
					>
						Mark as Finished
					</Button>
				);
			case 'finished':
				return (
					<Button
						fullWidth
						variant="contained"
						onClick={() => setStatus('completed')}
					>
						Mark as Completed
					</Button>
				);
			case 'completed':
			default:
				return;
		}
	};

	return (
		<>
			<AppBar />
			<Box sx={{ padding: 2 }}>
				<Button
					startIcon={<ArrowBackIosNew />}
					onClick={() => Router.push('/backlog')}
				>
					Back
				</Button>
			</Box>
			{loading && !game ? null : (
				<Box
					sx={{
						padding: 2,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						height: '80vh',
					}}
				>
					<Box>
						<Typography variant="h5">{game.title}</Typography>
						<Typography>{game.platform}</Typography>
					</Box>
					<StatusButton status={game.status} />

					<Button
						variant="contained"
						color="error"
						fullWidth
						onClick={handleDelete}
					>
						Delete
					</Button>
				</Box>
			)}
			<ConfirmModal
				open={openConfirm}
				setOpen={setOpenConfirm}
				confirmAction={deleteAction}
			/>
		</>
	);
};

export default Game;
