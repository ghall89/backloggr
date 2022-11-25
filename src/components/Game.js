import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import { Button, Typography } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';

import { getGame, deleteGame } from '../lib/games';
import { AppBar } from './components';

const Game = ({ id }) => {
	const { user } = useUser();

	const [loading, setLoading] = useState(true);
	const [game, setGame] = useState();

	const handleApi = async () => {
		const data = await getGame(user.sub, id);
		setGame(data[0]);

		setLoading(false);
	};

	useEffect(() => {
		if (user) {
			handleApi();
		}
	}, [user]);

	return (
		<>
			<AppBar />
			<Button startIcon={<ArrowBackIosNew />} href="/backlog">
				Back
			</Button>
			{loading ? null : (
				<>
					<Typography>{game.title}</Typography>
					<Typography>{game.platform}</Typography>
					<Typography>{game.status}</Typography>
				</>
			)}
		</>
	);
};

export default Game;
