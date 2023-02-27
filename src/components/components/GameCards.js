import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'

import {
	Box,
	Card,
	CardContent,
	CardMedia,
	ClickAwayListener,
	Grid,
	Grow,
	IconButton,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Tooltip,
	Typography,
} from '@mui/material'

import { MoreVert, Info } from '@mui/icons-material'

import { useAppContext } from '/src/AppContext'

import { starFilter, setStatus } from '@lib/functions'

const GameMenu = ({ id, status }) => {
	const { handleApi } = useAppContext()

	const [open, setOpen] = useState(false)
	const anchorRef = useRef(null)

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen)
	}

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}

		setOpen(false)
	}

	const handleListKeyDown = (event) => {
		if (event.key === 'Tab') {
			event.preventDefault()
			setOpen(false)
		} else if (event.key === 'Escape') {
			setOpen(false)
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open)
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus()
		}

		prevOpen.current = open
	}, [open])

	return (
		<>
			<IconButton
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? 'composition-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
				variant="solid"
			>
				<MoreVert />
			</IconButton>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="right-start"
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom-start' ? 'left top' : 'left bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
									onKeyDown={handleListKeyDown}
								>
									{status === 'in_progress' ? null : (
										<MenuItem
											onClick={() =>
												setStatus(id, 'in_progress', null, handleApi)
											}
										>
											Playing
										</MenuItem>
									)}
									{status === 'finished' ? null : (
										<MenuItem
											onClick={() => setStatus(id, 'finished', null, handleApi)}
										>
											Finished
										</MenuItem>
									)}
									{status === 'completed' ? null : (
										<MenuItem
											onClick={() =>
												setStatus(id, 'completed', null, handleApi)
											}
										>
											Completed
										</MenuItem>
									)}
									{status === 'finished' || status === 'completed' ? (
										<MenuItem
											onClick={() =>
												setStatus(id, 'in_progress', true, handleApi)
											}
										>
											Replaying
										</MenuItem>
									) : null}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	)
}

GameMenu.propTypes = {
	id: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
}

const GameCard = ({ game, handleGameModal }) => (
	<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
		<Card sx={{ width: '100%', position: 'relative' }}>
			<Box
				sx={{
					width: '100%',
					padding: 1,
					position: 'absolute',
					display: 'flex',
					justifyContent: 'space-between',
					background:
						'linear-gradient(180deg, rgba(0,0,0,0.7684261204481793) 0%, rgba(0,0,0,0) 100%)',
				}}
			>
				<GameMenu id={game._id} status={game.status} setStatus={setStatus} />
				<IconButton onClick={() => handleGameModal(game._id)}>
					<Info />
				</IconButton>
			</Box>
			<CardMedia
				component="img"
				height="194"
				image={game.img}
				alt={game.title}
			/>
			<CardContent>
				<Tooltip title={`${game.title} - ${game.platform}`} placement="top">
					<Typography noWrap>{game.title}</Typography>
				</Tooltip>
			</CardContent>
		</Card>
	</Grid>
)

GameCard.propTypes = {
	game: PropTypes.object.isRequired,
	setStatus: PropTypes.func.isRequired,
	handleGameModal: PropTypes.func.isRequired,
}

const GameCards = ({ games, loading, setModalId, setModalOpen }) => {
	const [starred, setStarred] = useState([])
	const [unstarred, setUnstarred] = useState([])

	useEffect(() => {
		if (games) {
			setStarred(starFilter(games, true))
			setUnstarred(starFilter(games, false))
		}
	}, [games])

	const handleGameModal = (id) => {
		setModalId(id)
		setModalOpen(true)
	}

	return (
		<Box sx={{ padding: 2 }}>
			{loading ? null : (
				<Grid container spacing={2}>
					{starred?.map((game) => (
						<GameCard
							game={game}
							key={game._id}
							handleGameModal={handleGameModal}
						/>
					))}
					{unstarred?.map((game) => (
						<GameCard
							game={game}
							key={game._id}
							handleGameModal={handleGameModal}
						/>
					))}
				</Grid>
			)}
		</Box>
	)
}

GameCards.propTypes = {
	games: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	setModalId: PropTypes.func.isRequired,
	setModalOpen: PropTypes.func.isRequired,
}

export default GameCards
