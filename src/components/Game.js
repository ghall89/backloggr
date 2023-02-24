import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'

import { useSession } from 'next-auth/react'

import Router, { useRouter } from 'next/router'

import { useAppContext } from '../AppContext'

import {
	Box,
	Button,
	Chip,
	FormControl,
	IconButton,
	MenuItem,
	Select,
	Typography,
} from '@mui/material'
import {
	ArrowBackIosNew,
	CheckBox,
	Delete,
	EmojiEvents,
	Loop,
	SportsEsports,
	StarOutline,
	StarRate,
} from '@mui/icons-material'

import { setStatus, deleteAction, setStarStatus } from '../lib/functions'
import handleIgdb from '../lib/handleIgdb'

import { ConfirmModal, PlatformIcon, AppBar, NavTabs } from './components'

const getDameDetails = async (id, setGameDetails) => {
	const game = await handleIgdb(id, 'gameById')
	setGameDetails(game[0])
	return
}

const Game = () => {
	const { data, status } = useSession()

	const router = useRouter()
	const { id } = router.query

	const { games, handleApi } = useAppContext()

	const [openConfirm, setOpenConfirm] = useState(false)
	const [loading, setLoading] = useState(true)
	const [game, setGame] = useState()
	const [gameDetails, setGameDetails] = useState()
	const [statusSelect, setStatusSelect] = useState()
	// const [starred, setStarred] = useState();

	const starredMemo = useMemo(() => {
		if (game?.starred) {
			return true
		} else {
			return false
		}
	}, [game])

	const statusMemo = useMemo(() => {
		if (!game) {
			return
		}
		switch (game.status) {
			case 'not_started':
				return 'Owned'
			case 'in_progress':
				return 'Playing'
			case 'finished':
				return 'Played'
			case 'completed':
				return 'Conquered'
		}
	}, [game])

	const handleDelete = () => setOpenConfirm(true)

	const handleNavTabs = (filter) => Router.push(`/backlog?tab=${filter}`)

	useEffect(() => {
		if (status === 'authenticated') {
			games.forEach((game) => {
				if (game._id === id) {
					setGame(game)
				}
			})
		}
	}, [status])

	useEffect(() => {
		if (game) {
			getDameDetails(game.igdb_id, setGameDetails)
		}
	}, [game])

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
				)
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
				)
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
				)
			case 'completed':
			default:
				return
		}
	}

	return (
		<>
			<Head>
				<title>{`Backloggr - ${game?.title}`}</title>
			</Head>
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

			{loading && !game && !gameDetails ? null : (
				<Box sx={{ paddingLeft: { xs: 0, md: 31 } }}>
					<Box
						sx={{
							padding: 2,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 2,
							height: 200,
							width: { xs: '100%', sm: '600px' },
							marginX: 'auto',
						}}
					>
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
									<Typography variant="h6" color="primary">
										{statusMemo} on {game?.platform}
									</Typography>
								</Box>
							</Box>
							<Box>
								<IconButton
									onClick={() =>
										setStarStatus(!starredMemo, id, game, setGame, handleApi)
									}
									size="medium"
								>
									{starredMemo ? <StarRate color="primary" /> : <StarOutline />}
								</IconButton>
							</Box>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								maxWidth: '100%',
								minHeight: 200,
								margin: { sx: 0, md: 4 },
							}}
						>
							<img
								height="100%"
								src={game.img ? game.img : 'img/no-image.jpg'}
								alt={
									game.img
										? `cover image for ${game.title}`
										: 'placeholder image'
								}
							/>
							<Typography sx={{ padding: 2, overflow: 'scroll' }}>
								{gameDetails?.summary}
							</Typography>
						</Box>

						{/* <Box
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
						</Box> */}
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
				</Box>
			)}
			<NavTabs setFilter={handleNavTabs} />
			<ConfirmModal
				open={openConfirm}
				setOpen={setOpenConfirm}
				confirmAction={() => deleteAction(id, handleApi)}
			/>
		</>
	)
}

export default Game
