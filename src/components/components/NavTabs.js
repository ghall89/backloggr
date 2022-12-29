import { useState } from 'react';
import Router, { useRouter } from 'next/router';

import {
	Badge,
	Chip,
	Divider,
	Drawer,
	DrawerHeader,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tab,
	Tabs,
	useMediaQuery,
} from '@mui/material';

import { useTheme } from '@mui/styles';
import {
	CheckBox,
	EmojiEvents,
	FormatListBulleted,
	SportsEsports,
	BarChart,
	Logout,
} from '@mui/icons-material';

const tabs = [
	{
		value: 'not_started',
		label: 'Backlog',
		icon: <FormatListBulleted />,
	},
	{
		value: 'in_progress',
		label: 'Playing',
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

const NavTabs = ({ setFilter, counts }) => {
	const { query } = useRouter();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
						backgroundColor: 'rgba(36, 39, 58, 0.9)',
						paddingBottom: 3,
						backdropFilter: 'blur(10px)',
						boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
						'& .MuiTabs-indicator': {
							display: 'none',
						},
					}}
					value={tabState}
					onChange={handleTabs}
					variant="fullWidth"
				>
					{tabs.map(({ value, label, icon }) => (
						<Tab key={value} value={value} label={label} icon={icon} />
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
								<ListItemButton
									onClick={() => handleTabs(null, value)}
									selected={tabState === value}
								>
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText primary={label} />
									{counts[value] > 0 ? <Chip label={counts[value]} /> : null}
								</ListItemButton>
							</ListItem>
						))}
						<Divider />
						<ListItem disablePadding>
							<ListItemButton onClick={() => Router.push('/stats')}>
								<ListItemIcon>
									<BarChart />
								</ListItemIcon>
								<ListItemText primary="Stats" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => Router.push('/api/auth/signout')}>
								<ListItemIcon>
									<Logout />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItemButton>
						</ListItem>
					</List>
				</Drawer>
			)}
		</>
	);
};

export default NavTabs;
