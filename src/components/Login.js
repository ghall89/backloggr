import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { FaDiscord, FaTwitch } from 'react-icons/fa'

import { signIn } from 'next-auth/react'

import { Box, Button, Dialog, Typography } from '@mui/material'

const Login = ({ open }) => {
	const { data, status } = useSession()

	return (
		<Dialog open={open}>
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
		</Dialog>
	)
}

export default Login
