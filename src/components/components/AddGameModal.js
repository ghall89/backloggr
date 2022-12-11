import { useState, useMemo, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import {
	Box,
	Button,
	Dialog,
	FormControl,
	InputLabel,
	ListSubheader,
	MenuItem,
	Select,
	TextField,
	Typography,
	Link,
} from '@mui/material';

const gameSearch = async query => {
	const res = await fetch(
		`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${query}`,
	)
		.then(response => response.json())
		.catch(err => console.error(err));

	return res;
};

const AddGameModal = ({ openModal, setOpenModal, addAction }) => {
	const { user } = useUser();

	const [query, setQuery] = useState();
	const [searchResults, setSearchResults] = useState([]);
	const [selectedGame, setSelectedGame] = useState();
	const [gamePlatforms, setGamePlatforms] = useState([]);
	const [selectedPlatform, setSelectedPlatform] = useState();

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

	const handleClose = () => {
		handleClearState();
		setOpenModal(false);
	};

	const handleSubmit = async () => {
		let gameData = {
			status: 'not_started',
			user_ref: user.sub,
			starred: false,
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
				};
				return;
			}
		});

		console.log(gameData);

		await addAction(gameData);
		handleClose();
	};

	return (
		<Dialog onClose={handleClose} open={openModal}>
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
						<Button onClick={() => handleSearch()} variant="contained">
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
						<Button onClick={handleClearState} variant="contained">
							Search Again
						</Button>
						<Button onClick={handleSubmit} variant="contained">
							Add Game
						</Button>
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
