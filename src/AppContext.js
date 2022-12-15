import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import { addGame, getGames, deleteGame } from './lib/games';

const AppContext = createContext();

export const ContextWrapper = ({ children }) => {
	const { user } = useUser();
	const [games, setGames] = useState();
	const [loading, setLoading] = useState(true);

	const handleApi = () => {
		setLoading(true);
		setTimeout(async () => {
			const data = await getGames(user.sub);
			setGames(data);
			window.sessionStorage.setItem('games', JSON.stringify(data));
			setLoading(false);
		}, 1000);
	};

	useEffect(() => {
		const session = window.sessionStorage.getItem('games');

		if (session) {
			setGames(JSON.parse(session));
			setLoading(false);
			return;
		}

		if (user) {
			handleApi();
		}
	}, [user]);

	return (
		<AppContext.Provider value={{ games, handleApi, user, loading }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
