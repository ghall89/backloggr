import { useState, useMemo, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'

import {
	Box,
	Button,
	Dialog,
	Link,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import { Cached, Search } from '@mui/icons-material'

import { useAppContext } from '../../../AppContext'

import { addGame } from '../../../lib/games'

import handleIgdb from '../../../lib/handleIgdb'

import AddButton from './components/AddButton'

const AddGameModal = ({ openModal, setOpenModal }) => {
	const { data } = useSession()
	const { games, handleApi } = useAppContext()

	const [query, setQuery] = useState()
	const [searchResults, setSearchResults] = useState([])
	const [selectedGame, setSelectedGame] = useState()
	const [gamePlatforms, setGamePlatforms] = useState([])
	const [selectedPlatform, setSelectedPlatform] = useState()

	const [open, setOpen] = useState(false)
	const anchorRef = useRef(null)

	const [noResults, setNoResults] = useState(false)

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen)
	}

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}

		setOpen(false)
	}

	function handleListKeyDown(event) {
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

	const gamePlatformsMemo = useMemo(() => {
		searchResults.forEach((game) => {
			if (selectedGame === game.id) {
				return game.platforms
			}
		})
	}, [selectedGame, searchResults])

	const handleSearch = async () => {
		const res = await handleIgdb(query, 'searchGames')
		if (res.length >= 1) {
			await setSearchResults(res)
			setSelectedGame(res[0].id)
			setNoResults(false)
		} else {
			setNoResults(true)
		}
	}

	const handleChange = async (event) => await setPlatform(event.target.value)

	useEffect(() => {
		searchResults.forEach((game) => {
			if (selectedGame === game.id) {
				setGamePlatforms(game.platforms)
				setSelectedPlatform(game.platforms[0].name)
			}
		})
	}, [selectedGame])

	const handleClearState = () => {
		setQuery()
		setSearchResults([])
		setSelectedGame()
		setGamePlatforms([])
		setSelectedPlatform()
	}

	const handleModalClose = () => {
		handleClearState()
		setOpenModal(false)
	}

	const addAction = async (submitBody) => {
		games.forEach((game) => {
			if (game.igdb_id === submitBody.igdb_id) {
				alert('This game is already in your backlog!')
				return
			}
		})
		await addGame(submitBody)
		await handleApi()
	}

	const handleSubmit = async (status) => {
		const currentDateTime = new Date().toUTCString()

		let gameData = {
			status,
			user_ref: data.user.id,
			starred: false,
			added: currentDateTime,
			replaying: false,
		}

		searchResults.forEach((game) => {
			if (selectedGame === game.id) {
				gameData = {
					...gameData,
					igdb_id: game.id,
					title: game.name,
					platform: selectedPlatform,
					img: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`,
					genres: game.genres,
				}
				return
			}
		})

		await addAction(gameData)
		handleModalClose()
	}

	return (
		<Dialog onClose={handleModalClose} open={openModal}>
			<Box
				sx={{
					padding: 3,
					display: 'flex',
					flexDirection: 'column',
					gap: 4,
					backgroundColor: '#363a4f',
					color: '#cad3f5',
					width: '300px',
				}}
			>
				{searchResults < 1 ? (
					<>
						<TextField
							onChange={({ target }) => setQuery(target.value)}
							label="Title"
							variant="outlined"
						/>
						{noResults ? (
							<Typography color="error" sx={{ textAlign: 'center' }}>
								No results. Try again!
							</Typography>
						) : null}
						<Button
							disabled={query?.length > 0 ? false : true}
							onClick={() => handleSearch()}
							variant="contained"
							startIcon={<Search />}
						>
							Search
						</Button>
					</>
				) : (
					<>
						<Select
							labelId="game-select-label"
							id="game-select"
							value={selectedGame}
							label="Game"
							onChange={({ target }) => setSelectedGame(target.value)}
						>
							{searchResults.map((game) => (
								<MenuItem key={game.id} value={game.id}>
									{game.name}
								</MenuItem>
							))}
						</Select>
						<Select
							labelId="platform-select-label"
							id="platform-select"
							value={selectedPlatform ? selectedPlatform : ''}
							label="Platform"
							onChange={({ target }) => setSelectedPlatform(target.value)}
						>
							{gamePlatforms?.map((platform) => (
								<MenuItem key={platform.id} value={platform?.name}>
									{platform?.name}
								</MenuItem>
							))}
						</Select>

						<Button
							onClick={handleClearState}
							variant="contained"
							startIcon={<Cached />}
						>
							Search Again
						</Button>
						<AddButton handleSubmit={handleSubmit} />
					</>
				)}
			</Box>
			<Box sx={{ paddingY: 1, textAlign: 'center' }}>
				<Typography>
					Results provided by{' '}
					<Link href="https://api-docs.igdb.com/" target="blank">
						IGDB API
					</Link>
				</Typography>
			</Box>
		</Dialog>
	)
}

export default AddGameModal
