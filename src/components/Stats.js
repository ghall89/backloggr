import { useMemo, useCallback } from 'react';
import Router, { useRouter } from 'next/router';

import { Box, Button, Grid, Typography } from '@mui/material';

import { useAppContext } from '../AppContext';

const Stats = () => {
	const { games, user } = useAppContext();

	console.log(user);

	const percentCalc = useCallback(
		status => {
			let total = 0;
			games.forEach(game => {
				if (game.status === status) {
					total++;
				}
			});

			return Math.round((100 * total) / games.length);
		},
		[games],
	);

	const finishedPercentMemo = useMemo(
		() => percentCalc('finished'),
		[percentCalc],
	);
	const completedPercentMemo = useMemo(
		() => percentCalc('completed'),
		[percentCalc],
	);

	return (
		<Box
			sx={{
				paddingTop: 10,
				paddingX: 4,
			}}
		>
			<Typography
				sx={{ fontWeight: 'medium', textAlign: 'center' }}
				variant="h4"
			>
				Your Backlog Stats
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 4,
					marginTop: 4,
					textAlign: 'center',
				}}
			>
				<Grid container spacing={3}>
					<Grid item xs={4}>
						<Typography sx={{ fontSize: 40 }}>{games.length}</Typography>
						<Typography>Total Games</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography sx={{ fontSize: 40 }}>
							{finishedPercentMemo}%
						</Typography>
						<Typography>Finished</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography sx={{ fontSize: 40 }}>
							{completedPercentMemo}%
						</Typography>
						<Typography>Completed</Typography>
					</Grid>
				</Grid>
				<Button
					variant="contained"
					fullWidth
					onClick={() => Router.push('/backlog')}
				>
					Return to Backlog
				</Button>
			</Box>
		</Box>
	);
};

export default Stats;