import Router from 'next/router'
import Image from 'next/image'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { FaDiscord, FaTwitch } from 'react-icons/fa'

import { signIn } from 'next-auth/react'

import { Box, Button, Typography } from '@mui/material'

const Login = () => {
	const { data, status } = useSession()

	useEffect(() => {
		if (status === 'authenticated') {
			Router.push('/backlog')
		}
	})

	useEffect(() => window.sessionStorage.clear(), [])

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
					fullWidth
					onClick={() => signIn('discord')}
					variant="contained"
					startIcon={<FaDiscord />}
					disabled={status !== 'unauthenticated' ? true : false}
				>
					Discord Login
				</Button>

				<Button
					fullWidth
					onClick={() => signIn('twitch')}
					variant="contained"
					startIcon={<FaTwitch />}
					disabled={status !== 'unauthenticated' ? true : false}
				>
					Twitch Login
				</Button>
			</Box>
		</Box>
	)
}

export default Login
