import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import Router, { useRouter } from 'next/router';

import {
	Box,
	Button,
	FormControl,
	IconButton,
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
	StarOutline,
	StarRate,
} from '@mui/icons-material';

import { getGame, deleteGame, updateGame } from '../lib/games';
import { AppBar, ConfirmModal, PlatformIcon } from './components';

const Game = () => {
	const { user } = useUser();
	const router = useRouter();
	const { id } = router.query;

	const [openConfirm, setOpenConfirm] = useState(false);
	const [loading, setLoading] = useState(true);
	const [game, setGame] = useState();
	const [statusSelect, setStatusSelect] = useState();
	// const [starred, setStarred] = useState();

	const starredMemo = useMemo(() => {
		if (game?.starred) {
			return true;
		} else {
			return false;
		}
	}, [game]);

	const handleApi = async () => {
		const session = await JSON.parse(window.sessionStorage.getItem('games'));

		if (session) {
			await session.forEach(item => {
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

	const setStarStatus = async bool => {
		setGame({ ...game, starred: bool });
		await updateGame(`{"id":"${id}","params":{"starred": "${bool}"}}`);
		window.sessionStorage.clear();
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
			<Head>
				<title>{`Backloggr - ${game?.title}`}</title>
			</Head>
			<AppBar />
			<Box sx={{ padding: 2, paddingTop: 10 }}>
				<Button
					startIcon={<ArrowBackIosNew />}
					onClick={() => Router.push(`/backlog?tab=${game.status}`)}
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
						alignItems: 'center',
						gap: 2,
						height: 200,
					}}
				>
					<Box sx={{ maxWidth: 400 }}>
						<img width="100%" src="/no-image.jpg" alt="placeholder image" />
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '100%',
							alignItems: 'center',
						}}
					>
						<Box>
							<Typography variant="h5">{game?.title}</Typography>
							<Typography variant="h6">{game?.platform}</Typography>
						</Box>
						<Box>
							<IconButton
								onClick={() => setStarStatus(!starredMemo)}
								size="medium"
							>
								{starredMemo ? <StarRate color="primary" /> : <StarOutline />}
							</IconButton>
						</Box>
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
