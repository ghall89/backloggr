import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tab,
	Tabs,
	Tooltip,
} from '@mui/material';
import { useState, useMemo } from 'react';

import PlatformIcon from './PlatformIcon';

const GameList = ({ games, handleDelete, loading, setFilter, handleApi }) => {
	const [tabState, setTabState] = useState('not_started');

	const handleTabs = (event, newValue) => {
		setTabState(newValue);
		setFilter(newValue);
	};

	return (
		<>
			<Tabs value={tabState} onChange={handleTabs} variant="scrollable">
				<Tab value="not_started" label="Backlog" />
				<Tab value="in_progress" label="In Progress" />
				<Tab value="finished" label="Finished" />
				<Tab value="completed" label="Completed" />
				<Tab value="all" label="All" />
			</Tabs>
			{loading ? null : (
				<List
					sx={{
						maxHeight: '80vh',
						bgcolor: 'background.paper',
						position: 'relative',
						overflow: 'auto',
					}}
				>
					{games?.map(game => (
						<ListItem key={game._id}>
							<ListItemButton href={`/game/${game._id}`}>
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
};

export default GameList;
