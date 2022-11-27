import Router from 'next/router';

import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';

import PlatformIcon from './PlatformIcon';

const GameList = ({ games, loading }) => (
	<>
		{loading ? null : (
			<List
				sx={{
					bgcolor: 'background.paper',
					position: 'relative',
					overflow: 'auto',
				}}
			>
				{games?.map(game => (
					<ListItem key={game._id}>
						<ListItemButton onClick={() => Router.push(`/game/${game._id}`)}>
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
);

export default GameList;
