import { useEffect, useState, useRef } from 'react';

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
	Typography,
} from '@mui/material';

import { StarRate, MoreVert } from '@mui/icons-material';

import { starFilter } from '../../lib/functions';

const GameMenu = ({ id, status, setStatus }) => {
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
										<MenuItem onClick={() => setStatus(id, 'in_progress')}>
											Playing
										</MenuItem>
									)}
									{status === 'finished' ? null : (
										<MenuItem onClick={() => setStatus(id, 'finished')}>
											Finished
										</MenuItem>
									)}
									{status === 'completed' ? null : (
										<MenuItem onClick={() => setStatus(id, 'completed')}>
											Completed
										</MenuItem>
									)}
									{status === 'finished' || status === 'completed' ? (
										<MenuItem
											onClick={() => setStatus(id, 'in_progress', true)}
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
	);
};

const GameCard = ({ game, setStatus }) => (
	<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
		<Card sx={{ width: '100%', position: 'relative' }}>
			<Box
				sx={{
					width: '100%',
					padding: 1,
					position: 'absolute',
					background:
						'linear-gradient(180deg, rgba(0,0,0,0.7684261204481793) 0%, rgba(0,0,0,0) 100%)',
				}}
			>
				<GameMenu id={game._id} status={game.status} setStatus={setStatus} />
			</Box>
			<CardMedia
				component="img"
				height="194"
				image={game.img}
				alt={game.title}
			/>
			<CardContent>
				<Typography noWrap>{game.title}</Typography>
			</CardContent>
		</Card>
	</Grid>
);

const GameCards = ({ games, loading, setStatus }) => {
	const [starred, setStarred] = useState([]);
	const [unstarred, setUnstarred] = useState([]);

	useEffect(() => {
		if (games) {
			setStarred(starFilter(games, true));
			setUnstarred(starFilter(games, false));
		}
	}, [games]);

	return (
		<Box sx={{ padding: 2 }}>
			{loading ? null : (
				<>
					<Grid container spacing={2}>
						{starred?.map(game => (
							<GameCard game={game} key={game._id} setStatus={setStatus} />
						))}
						{unstarred?.map(game => (
							<GameCard game={game} key={game._id} setStatus={setStatus} />
						))}
					</Grid>
				</>
			)}
		</Box>
	);
};

export default GameCards;
