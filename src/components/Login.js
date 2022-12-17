import Router from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

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
	const { data, status } = useSession();

	useEffect(() => {
		if (status === 'authenticated') {
			Router.push('/backlog');
		}
	});

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
				<CardMedia
					component="img"
					height="194"
					image="img/igor-karimov-unsplash.jpg"
					alt="Hello world"
				/>
				<CardContent>
					<Typography align="center" gutterBottom>
						Log in or sign up to create and manage your backlog.
					</Typography>
					<Button href="/api/auth/signin" variant="contained" fullWidth>
						Login
					</Button>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Login;
