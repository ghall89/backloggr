import { useState, useMemo, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

import {
	Box,
	Button,
	ButtonGroup,
	ClickAwayListener,
	Dialog,
	FormControl,
	Grid,
	Grow,
	IconButton,
	InputLabel,
	Link,
	List,
	ListItemText,
	ListSubheader,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { Add, Cached, MoreHoriz, Search } from '@mui/icons-material';

import { useAppContext } from '../../../AppContext';

import { addGame } from '../../../lib/games';

import AddButton from './components/AddButton';

const gameSearch = async query => {
	const res = await fetch(
		`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${query}`,
	)
		.then(response => response.json())
		.catch(err => console.error(err));

	return res;
};

const AddGameModal = ({ openModal, setOpenModal }) => {
	const { data } = useSession();
	const { games, handleApi } = useAppContext();

	const [query, setQuery] = useState();
	const [searchResults, setSearchResults] = useState([]);
	const [selectedGame, setSelectedGame] = useState();
	const [gamePlatforms, setGamePlatforms] = useState([]);
	const [selectedPlatform, setSelectedPlatform] = useState();

	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const gamePlatformsMemo = useMemo(() => {
		searchResults.forEach(game => {
			if (selectedGame === game.id) {
				return game.platforms;
			}
		});
	}, [selectedGame, searchResults]);

	const handleSearch = async () => {
		const res = await gameSearch(query);
		await setSearchResults(res.results);
		setSelectedGame(res.results[0].id);
	};

	const handleChange = async event => await setPlatform(event.target.value);

	useEffect(() => {
		searchResults.forEach(game => {
			if (selectedGame === game.id) {
				setGamePlatforms(game.platforms);
				setSelectedPlatform(game.platforms[0].platform.name);
			}
		});
	}, [selectedGame]);

	const handleClearState = () => {
		setQuery();
		setSearchResults([]);
		setSelectedGame();
		setGamePlatforms([]);
		setSelectedPlatform();
	};

	const handleModalClose = () => {
		handleClearState();
		setOpenModal(false);
	};

	const addAction = async submitBody => {
		games.forEach(game => {
			if (game.rawg_id === submitBody.rawg_id) {
				alert('This game is already in your backlog!');
				return;
			}
		});
		await addGame(submitBody);
		await handleApi();
	};

	const handleSubmit = async status => {
		const currentDateTime = new Date().toUTCString();

		let gameData = {
			status,
			user_ref: data.user.id,
			starred: false,
			added: currentDateTime,
			replaying: false,
		};

		searchResults.forEach(game => {
			if (selectedGame === game.id) {
				gameData = {
					...gameData,
					rawg_id: game.id,
					title: game.name,
					platform: selectedPlatform,
					img: game.background_image,
					avg_playtime: game.playtime,
					metacritic: game.metacritic,
					genres: game.genres,
					release_dt: game.released,
				};
				return;
			}
		});

		console.log(gameData);

		await addAction(gameData);
		handleModalClose();
	};

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
							{searchResults.map(game => (
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
							{gamePlatforms?.map(({ platform }) => (
								<MenuItem key={platform.id} value={platform.name}>
									{platform.name}
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
					<Link href="https://rawg.io/apidocs" target="blank">
						RAWG API
					</Link>
				</Typography>
			</Box>
		</Dialog>
	);
};

export default AddGameModal;
