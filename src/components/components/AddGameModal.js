import { useState, useMemo, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

import {
	Box,
	Button,
	ClickAwayListener,
	Dialog,
	FormControl,
	Grid,
	Grow,
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

const gameSearch = async query => {
	const res = await fetch(
		`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${query}`,
	)
		.then(response => response.json())
		.catch(err => console.error(err));

	return res;
};

const AddGameModal = ({ openModal, setOpenModal, addAction }) => {
	const { data } = useSession();

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

	const handleSubmit = async () => {
		const currentDateTime = new Date().toUTCString();

		let gameData = {
			status: 'not_started',
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
		<>
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
							<Grid container spacing={2}>
								<Grid item xs={8}>
									<Button
										onClick={handleSubmit}
										variant="contained"
										fullWidth
										startIcon={<Add />}
									>
										Add Game
									</Button>
								</Grid>
								<Grid item xs={4}>
									<Button
										variant="outlined"
										fullWidth
										ref={anchorRef}
										id="composition-button"
										aria-controls={open ? 'composition-menu' : undefined}
										aria-expanded={open ? 'true' : undefined}
										aria-haspopup="true"
										onClick={handleToggle}
									>
										<MoreHoriz />
									</Button>
								</Grid>
							</Grid>
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
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-end"
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
									id="more-add-menu"
									aria-labelledby="more-user-button"
									onKeyDown={handleListKeyDown}
								>
									<MenuItem onClick={() => Router.push('/stats')}>
										<ListItemText>Stats</ListItemText>
									</MenuItem>
									<MenuItem onClick={() => Router.push('/api/auth/signout')}>
										<ListItemText>Logout</ListItemText>
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};

export default AddGameModal;
