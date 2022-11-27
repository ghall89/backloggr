import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { UserProvider } from '@auth0/nextjs-auth0';

import { AppBar } from '../src/components/components';

function MyApp({ Component, pageProps }) {
	const theme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#7dc4e4',
				contrastText: 'white',
			},
			secondary: {
				main: '#f5a97f',
				contrastText: 'white',
			},
			error: {
				main: '#ed8796',
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
		<UserProvider>
			<ThemeProvider theme={theme}>
				<AppBar />
				<Component {...pageProps} />
			</ThemeProvider>
		</UserProvider>
	);
}

export default MyApp;
