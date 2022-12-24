import { useState } from 'react';
import Router, { useRouter } from 'next/router';

import {
	Tab,
	Tabs,
	Hidden,
	Drawer,
	DrawerHeader,
	Divider,
	IconButton,
	ListItemText,
	ListItem,
	List,
	ListItemButton,
	ListItemIcon,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import {
	CheckBox,
	EmojiEvents,
	FormatListBulleted,
	SportsEsports,
} from '@mui/icons-material';

const tabs = [
	{
		value: 'not_started',
		label: 'Backlog',
		icon: <FormatListBulleted />,
	},
	{
		value: 'in_progress',
		label: 'In Progress',
		icon: <SportsEsports />,
	},
	{
		value: 'finished',
		label: 'Finished',
		icon: <CheckBox />,
	},
	{
		value: 'completed',
		label: 'Completed',
		icon: <EmojiEvents />,
	},
];

const NavTabs = ({ setFilter }) => {
	const { query } = useRouter();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
	const [tabState, setTabState] = useState(query.tab || 'not_started');

	const drawerWidth = 250;

	const handleTabs = (event, newValue) => {
		setTabState(newValue);
		setFilter(newValue);
	};

	return (
		<>
			{isMobile ? (
				<Tabs
					sx={{
						position: 'fixed',
						bottom: 0,
						left: 0,
						right: 0,
						backgroundColor: '#24273a',
						paddingBottom: 3,
					}}
					value={tabState}
					onChange={handleTabs}
					variant="fullWidth"
				>
					{tabs.map(({ value, label, icon }) => (
						<Tab
							key={value}
							value={value}
							label={<Hidden mdDown>{label}</Hidden>}
							icon={icon}
							iconPosition="start"
						/>
					))}
				</Tabs>
			) : (
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box',
						},
					}}
					variant="persistent"
					anchor="left"
					open={true}
				>
					<List>
						{tabs.map(({ value, label, icon }) => (
							<ListItem key={value} disablePadding>
								<ListItemButton onClick={() => handleTabs(null, value)}>
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText primary={label} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Drawer>
			)}
		</>
	);
};

export default NavTabs;
