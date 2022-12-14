import '../styles/globals.css';

import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ContextWrapper } from '../src/AppContext';

function MyApp({ Component, pageProps }) {
	const { route } = useRouter();

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
				<ContextWrapper>
					<Component {...pageProps} />
				</ContextWrapper>
			</ThemeProvider>
		</UserProvider>
	);
}

export default MyApp;
