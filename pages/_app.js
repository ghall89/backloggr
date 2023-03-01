import PropTypes from 'prop-types'
import '../src/styles/globals.css'

import { createTheme, ThemeProvider } from '@mui/material'
import { SessionProvider } from 'next-auth/react'

import { ContextWrapper } from '../src/AppContext'

function App({ Component, pageProps }) {
	const theme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#4692ff',
				contrastText: 'white',
			},
			secondary: {
				main: '#c99151',
				contrastText: 'white',
			},
			error: {
				main: '#f0646f',
				contrastText: 'white',
			},
			background: {
				paper: '#1e2030',
				default: '#1e2030',
			},
			text: {
				primary: '#cad3f5',
			},
		},
	})

	return (
		<SessionProvider>
			<ThemeProvider theme={theme}>
				<ContextWrapper>
					<Component {...pageProps} />
				</ContextWrapper>
			</ThemeProvider>
		</SessionProvider>
	)
}

App.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object,
}

App.defaultProps = {
	pageProps: {},
}

export default App
