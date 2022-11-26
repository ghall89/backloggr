import { useState, useMemo } from 'react';
import Router, { useRouter } from 'next/router';

import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tab,
	Tabs,
	Tooltip,
} from '@mui/material';

import {
	ArrowBackIosNew,
	CheckBox,
	Delete,
	EmojiEvents,
	FormatListBulleted,
	Loop,
	SportsEsports,
} from '@mui/icons-material';

import PlatformIcon from './PlatformIcon';

const GameList = ({ games, loading, setFilter }) => {
	const { query } = useRouter();
	const [tabState, setTabState] = useState(query.tab || 'not_started');

	const handleTabs = (event, newValue) => {
		setTabState(newValue);
		setFilter(newValue);
	};

	return (
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

			<Tabs
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					backgroundColor: '#24273a',
				}}
				value={tabState}
				onChange={handleTabs}
				variant="fullWidth"
			>
				<Tab value="not_started" icon={<FormatListBulleted />} />
				<Tab value="in_progress" icon={<SportsEsports />} />
				<Tab value="finished" icon={<CheckBox />} />
				<Tab value="completed" icon={<EmojiEvents />} />
			</Tabs>
		</>
	);
};

export default GameList;
