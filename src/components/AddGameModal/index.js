import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
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
	Grow,
	styled,
} from '@mui/material'

import { Cached, Search } from '@mui/icons-material'

import { useAppContext } from '../../AppContext'

import { addGame } from '../../lib/games'

import handleIgdb from '../../lib/handleIgdb'

import AddButton from './components/AddButton'

const StyledFormBox = styled(Box)({
	padding: 20,
	display: 'flex',
	flexDirection: 'column',
	gap: 20,
	backgroundColor: '#363a4f',
	color: '#cad3f5',
	width: '300px',
})

const AddGameModal = ({ openModal, setOpenModal }) => {
	const { data } = useSession()
	const { handleApi } = useAppContext()

	const [query, setQuery] = useState()
	const [searchResults, setSearchResults] = useState([])
	const [selectedGame, setSelectedGame] = useState()
	const [gamePlatforms, setGamePlatforms] = useState([])
	const [selectedPlatform, setSelectedPlatform] = useState()

	const [noResults, setNoResults] = useState(false)

	const handleKeyPress = useCallback((event) => {
		console.log(`Key pressed: ${event.key}`)
	}, [])

	useEffect(() => {
		// attach the event listener
		document.addEventListener('keydown', handleKeyPress)

		// remove the event listener
		return () => {
			document.removeEventListener('keydown', handleKeyPress)
		}
	}, [handleKeyPress])

	const handleSearch = async () => {
		event.preventDefault()
		const res = await handleIgdb(query, 'searchGames')
		if (res.length >= 1) {
			await setSearchResults(res)
			setSelectedGame(res[0].id)
			setNoResults(false)
		} else {
			setNoResults(true)
		}
	}

	useEffect(() => {
		searchResults.forEach((game) => {
			if (selectedGame === game.id) {
				setGamePlatforms(game.platforms)
				setSelectedPlatform(game.platforms[0].name)
			}
		})
	}, [selectedGame, searchResults])

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
			}
		})

		await addAction(gameData)
		handleModalClose()
	}

	return (
		<Dialog
			onClose={handleModalClose}
			open={openModal}
			TransitionComponent={Grow}
		>
			{searchResults < 1 ? (
				<form onSubmit={handleSearch}>
					<StyledFormBox>
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
							disabled={!query?.length > 0}
							type="submit"
							variant="contained"
							startIcon={<Search />}
						>
							Search
						</Button>
					</StyledFormBox>
				</form>
			) : (
				<StyledFormBox>
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
						value={selectedPlatform || ''}
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
				</StyledFormBox>
			)}
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

AddGameModal.propTypes = {
	openModal: PropTypes.bool.isRequired,
	setOpenModal: PropTypes.func.isRequired,
}

export default AddGameModal
