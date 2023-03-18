import PropTypes from 'prop-types'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { useSession } from 'next-auth/react'

import {
	Box,
	Button,
	Dialog,
	IconButton,
	Fade,
	Grow,
	Slide,
	Typography,
	Toolbar,
	useMediaQuery,
} from '@mui/material'
import { Delete, Loop, StarOutline, StarRate, Close } from '@mui/icons-material'
import { useTheme } from '@mui/styles'

import { setStatus, deleteAction, setStarStatus } from '../../lib/functions'
import handleIgdb from '../../lib/handleIgdb'

import { useAppContext } from '../../AppContext'

import { ConfirmModal, StatusButton } from './components'

const getDameDetails = async (id, setGameDetails) => {
	const game = await handleIgdb(id, 'gameById')
	setGameDetails(game[0])
}

const GameModal = ({ id, open, modalClose }) => {
	const { status } = useSession()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	const { games, handleApi } = useAppContext()

	const [openConfirm, setOpenConfirm] = useState(false)
	const [game, setGame] = useState()
	const [gameDetails, setGameDetails] = useState()

	const starredMemo = useMemo(() => {
		if (game?.starred) {
			return true
		}
		return false
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

	useEffect(() => {
		if (status === 'authenticated' && id) {
			games?.forEach((gameObj) => {
				if (gameObj._id === id) {
					setGame(gameObj)
				}
			})
		}
	}, [status, games, id])

	useEffect(() => {
		if (game) {
			getDameDetails(game.igdb_id, setGameDetails)
		}
	}, [id, game])

	return (
		<Dialog
			open={open}
			onClose={modalClose}
			TransitionComponent={isMobile ? Slide : Grow}
			fullScreen={isMobile}
		>
			{isMobile ? (
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={modalClose}
						aria-label="close"
					>
						<Close />
					</IconButton>
				</Toolbar>
			) : null}
			{!game && !gameDetails ? null : (
				<Box>
					<Box
						sx={{
							padding: 2,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 2,
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
										{`${statusMemo} on ${game?.platform}`}
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
								alignItems: 'center',
								width: '100%',
								minHeight: 200,
								margin: { sx: 0, md: 4 },
								flexDirection: { xs: 'column', sm: 'row' },
							}}
						>
							<Image
								height={200}
								width={150}
								src={game.img ? game.img : 'img/no-image.jpg'}
								alt={
									game.img
										? `cover image for ${game.title}`
										: 'placeholder image'
								}
							/>
							<Fade
								in={gameDetails}
								sx={{
									padding: 2,
									overflow: 'scroll',
									height: 200,
									width: '100%',
								}}
							>
								<Typography>{gameDetails?.summary}</Typography>
							</Fade>
						</Box>
						<StatusButton
							gameStatus={game?.status}
							setStatus={setStatus}
							game={game}
						/>
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
			<ConfirmModal
				open={openConfirm}
				setOpen={setOpenConfirm}
				closeGameModal={modalClose}
				confirmAction={() => deleteAction(id, handleApi)}
			/>
		</Dialog>
	)
}

GameModal.propTypes = {
	id: PropTypes.string,
	open: PropTypes.bool,
	modalClose: PropTypes.func.isRequired,
}

GameModal.defaultProps = {
	id: null,
	open: false,
}

export default GameModal
