import '../styles/globals.css';

import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';

import { ContextWrapper } from '../src/AppContext';

function MyApp({ Component, pageProps }) {
	const { route } = useRouter();

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
	});

	return (
		<SessionProvider>
			<ThemeProvider theme={theme}>
				<ContextWrapper>
					<Component {...pageProps} />
				</ContextWrapper>
			</ThemeProvider>
		</SessionProvider>
	);
}

export default MyApp;
