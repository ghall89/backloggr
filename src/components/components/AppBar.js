import { useUser } from '@auth0/nextjs-auth0';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const AppBarComponent = () => {
	const { user } = useUser();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{`${user.nickname}'s Backlog`}
					</Typography>
					<Button href="/api/auth/logout" color="inherit">
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default AppBarComponent;
