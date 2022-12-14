import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';

import { useSession } from 'next-auth/react';

import Router, { useRouter } from 'next/router';

import { useAppContext } from '../AppContext';

import {
	Box,
	Button,
	Chip,
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

import { deleteGame, updateGame } from '../lib/games';
import { setStatus } from '../lib/functions';
import { ConfirmModal, PlatformIcon, AppBar } from './components';

const Game = () => {
	const { data, status } = useSession();

	const router = useRouter();
	const { id } = router.query;

	const { games, handleApi } = useAppContext();

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

	// 	const handleApi = async () => {
	// 		const session = await JSON.parse(window.sessionStorage.getItem('games'));
	//
	// 		if (session) {
	// 			await session.forEach(item => {
	// 				if (item._id.includes(id)) {
	// 					setGame(item);
	// 				}
	// 			});
	// 		} else {
	// 			const data = await getGame(user.sub, id);
	// 			setGame(data[0]);
	// 		}
	// 		setLoading(false);
	// 	};

	const setStarStatus = async bool => {
		setGame({ ...game, starred: bool });
		await updateGame(`{"id":"${id}","params":{"starred": "${bool}"}}`);
		handleApi();
		window.sessionStorage.clear();
	};

	const deleteAction = async () => {
		await deleteGame(id);
		await window.sessionStorage.clear();
		handleApi();
		Router.push('/backlog');
	};

	const handleDelete = () => setOpenConfirm(true);

	useEffect(() => {
		if (status === 'authenticated') {
			games.forEach(game => {
				if (game._id === id) {
					setGame(game);
				}
			});
		}
	}, [status]);

	const StatusButton = ({ gameStatus }) => {
		switch (gameStatus) {
			case 'not_started':
				return (
					<Button
						fullWidth
						variant="contained"
						onClick={() => setStatus(game._id, 'in_progress')}
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
						onClick={() => setStatus(game._id, 'finished')}
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
						onClick={() => setStatus(game._id, 'completed')}
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
			<AppBar
				button={
					<Button
						startIcon={<ArrowBackIosNew />}
						onClick={() => Router.push(`/backlog?tab=${game.status}`)}
					>
						Back
					</Button>
				}
			/>
			<Head>
				<title>{`Backloggr - ${game?.title}`}</title>
			</Head>

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
					<Box sx={{ maxWidth: '100%', minHeight: 200 }}>
						<img
							height="100%"
							src={game.img ? game.img : 'img/no-image.jpg'}
							alt={
								game.img ? `cover image for ${game.title}` : 'placeholder image'
							}
						/>
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
							<Box
								sx={{
									display: 'flex',
									gap: 1,
									alignItems: 'center',
									fontSize: '1.5rem',
								}}
							>
								<PlatformIcon label={game?.platform} />
								<Typography variant="h6">{game?.platform}</Typography>
							</Box>
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
					<Box
						sx={{
							display: 'flex',
							gap: 2,
							margin: '1rem 0',
							justifyContent: 'left',
						}}
					>
						{game?.genres.map(genre => (
							<Chip label={genre.name} key={genre.id} />
						))}
					</Box>
					<StatusButton gameStatus={game?.status} />
					{game?.status === 'finished' || game?.status === 'completed' ? (
						<Button
							color="secondary"
							fullWidth
							variant="contained"
							onClick={() => setStatus(game._id, 'in_progress', true)}
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
