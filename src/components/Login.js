import Router from 'next/router';
import Image from 'next/image';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { FaDiscord } from 'react-icons/fa';

import { signIn } from 'next-auth/react';

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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					gap: 3,
					padding: 3,
				}}
			>
				<Image
					src="/icons/icon-512x512.png"
					alt=""
					height={200}
					width={200}
					style={{ borderRadius: 100 }}
				/>

				<Typography align="center" gutterBottom>
					Log in or sign up to create and manage your backlog.
				</Typography>
				<Button
					onClick={() => signIn('discord')}
					variant="contained"
					fullWidth
					startIcon={<FaDiscord />}
					disabled={status !== 'unauthenticated' ? true : false}
				>
					{status !== 'unauthenticated'
						? 'Please Wait...'
						: 'Sign In With Discord'}
				</Button>
			</Box>
		</Box>
	);
};

export default Login;
