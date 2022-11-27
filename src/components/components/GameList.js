import Router from 'next/router';

import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

import { SentimentVeryDissatisfied } from '@mui/icons-material';

import PlatformIcon from './PlatformIcon';

const GameList = ({ games, loading }) => (
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
						{games?.map(game => (
							<ListItem key={game._id}>
								<ListItemButton
									onClick={() => Router.push(`/game/${game._id}`)}
								>
									<ListItemIcon>
										<PlatformIcon label={game.platform} />
									</ListItemIcon>
									<ListItemText>{game.title}</ListItemText>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				)}
			</>
		)}
	</>
);

export default GameList;
