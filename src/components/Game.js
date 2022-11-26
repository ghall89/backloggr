import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import Router, { useRouter } from 'next/router';

import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import {
	ArrowBackIosNew,
	CheckBox,
	Delete,
	EmojiEvents,
	Loop,
	SportsEsports,
} from '@mui/icons-material';

import { getGame, deleteGame, updateGame } from '../lib/games';
import { AppBar, ConfirmModal } from './components';

const Game = () => {
	const { user } = useUser();
	const router = useRouter();
	const { id } = router.query;

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
		Router.push(`/backlog?tab=${newStatus}`);
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
						startIcon={<SportsEsports />}
					>
						Playing
					</Button>
				);
			case 'in_progress':
				return (
					<Button
						fullWidth
						variant="contained"
						onClick={() => setStatus('finished')}
						startIcon={<CheckBox />}
					>
						Finished
					</Button>
				);
			case 'finished':
				return (
					<Button
						fullWidth
						variant="contained"
						onClick={() => setStatus('completed')}
						startIcon={<EmojiEvents />}
					>
						Completed
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
						gap: 2,
						height: 200,
					}}
				>
					<Box>
						<Typography variant="h5">{game?.title}</Typography>
						<Typography>{game?.platform}</Typography>
					</Box>
					<StatusButton status={game?.status} />
					{game?.status === 'finished' || game?.status === 'completed' ? (
						<Button
							color="secondary"
							fullWidth
							variant="contained"
							onClick={() => setStatus('in_progress')}
							startIcon={<Loop />}
						>
							Replaying
						</Button>
					) : null}
					<Button
						variant="contained"
						color="error"
						fullWidth
						onClick={handleDelete}
						startIcon={<Delete />}
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
