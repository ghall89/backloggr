import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';

const AppBarComponent = () => {
	const { user } = useUser();
	const [name, setName] = useState('Your');

	useEffect(() => {
		if (user?.nickname) {
			setName(`${user.nickname}'s`);
		}
	}, [user]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ backgroundColor: '#24273a' }}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{`${name} Backlog`}
					</Typography>
					<Button href="/api/auth/logout" color="error" startIcon={<Logout />}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default AppBarComponent;
