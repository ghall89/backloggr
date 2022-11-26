import { useUser } from '@auth0/nextjs-auth0';
import Router from 'next/router';

import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Link,
	Typography,
} from '@mui/material';

const Login = () => {
	const { user } = useUser();

	if (user) {
		Router.push('/backlog');
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				backgroundColor: '#1e2030',
			}}
		>
			<Card
				sx={{ maxWidth: 400, backgroundColor: '#363a4f', color: '#cad3f5' }}
			>
				<CardContent>
					<Typography variant="h6" align="center" gutterBottom>
						Welcome to your Gaming Backlog!
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					height="194"
					image="igor-karimov-unsplash.jpg"
					alt="Hello world"
				/>
				<CardContent>
					<Typography align="center" gutterBottom>
						Log in or sign up to create and manage your backlog.
					</Typography>
					<Button href="/api/auth/login" variant="contained" fullWidth>
						Login
					</Button>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Login;
