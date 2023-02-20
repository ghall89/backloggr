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
	Typography,
	useMediaQuery,
} from '@mui/material';

import { useTheme } from '@mui/styles';
import {
	AccountCircle,
	CheckBox,
	Coffee,
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

const NavTabs = ({ setFilter }) => {
	const { query, pathname } = useRouter();
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
				<>
					{pathname === '/backlog' ? (
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
								<Tab
									key={value}
									value={value}
									label={
										<Typography
											sx={{
												fontSize: { xs: 11, sm: 13 },
												textTransform: 'none',
											}}
										>
											{label}
										</Typography>
									}
									icon={icon}
								/>
							))}
						</Tabs>
					) : null}
				</>
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
									selected={tabState === value && pathname !== '/account'}
								>
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText primary={label} />
								</ListItemButton>
							</ListItem>
						))}
						<Divider />
						<ListItem disablePadding>
							<ListItemButton
								onClick={() => Router.push('/account')}
								selected={pathname === '/account'}
							>
								<ListItemIcon>
									<AccountCircle />
								</ListItemIcon>
								<ListItemText primary="Account" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton
								href="https://ko-fi.com/backloggr"
								target="_blank"
							>
								<ListItemIcon>
									<Coffee />
								</ListItemIcon>
								<ListItemText primary="Support on ko-fi" />
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
