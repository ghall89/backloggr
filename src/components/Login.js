import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'

import PropTypes from 'prop-types'

import { Box, Button, Dialog, Typography } from '@mui/material'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons'

const Login = ({ open }) => {
	const { status } = useSession()

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
					startIcon={<Icon icon={faDiscord} />}
					disabled={status !== 'unauthenticated'}
				>
					Discord Login
				</Button>

				<Button
					fullWidth
					onClick={() => signIn('twitch')}
					variant="contained"
					startIcon={<Icon icon={faTwitch} />}
					disabled
					// disabled={status !== 'unauthenticated'}
				>
					Twitch Login - Temporarily Unavailable
				</Button>
			</Box>
		</Dialog>
	)
}

Login.propTypes = {
	open: PropTypes.bool.isRequired,
}

export default Login
