import { useMemo, useCallback } from 'react';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { Box, Button, Grid, Typography } from '@mui/material';

import { useAppContext } from '../AppContext';

import { exportJson } from '../lib/functions';

import { AppBar } from './components';

const Stats = () => {
	const { data } = useSession();
	const { games, user } = useAppContext();

	const percentCalc = useCallback(
		status => {
			if (games) {
				let total = 0;
				games.forEach(game => {
					if (game.status === status) {
						total++;
					}
				});
				const percentage = Math.round((100 * total) / games.length);
				if (isNaN(percentage)) {
					return 0;
				}
				return percentage;
			}
			return 0;
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
		<>
			<AppBar title="Stats" />
			<Box
				sx={{
					paddingTop: 10,
					paddingX: 4,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 4,
						marginTop: 4,
						textAlign: 'center',
						width: { xs: '100%', sm: '540px' },
						marginX: 'auto',
					}}
				>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<Typography sx={{ fontSize: 40 }}>
								{games?.length || 0}
							</Typography>
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
					<Button
						variant="contained"
						fullWidth
						onClick={() => exportJson(user.name, games)}
					>
						Export Data
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Stats;
