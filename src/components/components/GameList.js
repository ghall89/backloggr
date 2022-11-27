import Router from 'next/router';

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

const GameList = ({ games, loading }) => (
	<>
		{loading ? (
			<Box sx={{ display: 'flex' }}>
				<CircularProgress />
			</Box>
		) : (
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
						{games?.map(game => (
							<>
								{game?.starred ? <ListGame key={game._id} game={game} /> : null}
							</>
						))}
						{games?.some(e => e.starred === true) ? <Divider /> : null}
						{games?.map(game => (
							<>
								{!game.starred ? <ListGame key={game._id} game={game} /> : null}
							</>
						))}
					</List>
				)}
			</>
		)}
	</>
);

export default GameList;
