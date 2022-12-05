import Router from 'next/router';
import { useState, useEffect } from 'react';
import {
	Box,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

import { SentimentVeryDissatisfied, StarRate } from '@mui/icons-material';

import PlatformIcon from './PlatformIcon';

const filter = (games, bool) => {
	const arr = [];
	games.forEach(game => {
		if (game.starred === bool) {
			arr.push(game);
		}
	});
	return arr;
};

const ListGame = ({ game }) => (
	<ListItem disableGutters>
		<ListItemButton onClick={() => Router.push(`/game/${game._id}`)}>
			<ListItemIcon>
				<PlatformIcon label={game.platform} />
			</ListItemIcon>
			<Divider />
			<ListItemText>{game.title}</ListItemText>
			{game.starred ? <StarRate color="primary" /> : null}
		</ListItemButton>
	</ListItem>
);

const GameList = ({ games, loading }) => {
	const [starred, setStarred] = useState([]);
	const [unstarred, setUnstarred] = useState([]);

	useEffect(() => {
		if (games) {
			setStarred(filter(games, true));
			setUnstarred(filter(games, false));
		}
	}, [games]);

	return (
		<>
			{loading ? null : (
				<>
					{games?.length === 0 ? (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								minHeight: '70vh',
								color: '#5b6078',
							}}
						>
							<SentimentVeryDissatisfied sx={{ marginRight: 1 }} />
							<Typography variant="h5">No Games</Typography>
						</Box>
					) : (
						<List
							sx={{
								bgcolor: 'background.paper',
								position: 'relative',
								overflow: 'auto',
							}}
						>
							{starred?.map(game => (
								<ListGame key={game._id} game={game} />
							))}
							{starred?.length > 0 ? <Divider /> : null}
							{unstarred?.map(game => (
								<ListGame key={game._id} game={game} />
							))}
						</List>
					)}
				</>
			)}
		</>
	);
};

export default GameList;
