import { useMemo, useCallback } from 'react';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { ArrowBackIosNew } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';

import { useAppContext } from '../AppContext';

import { exportJson } from '../lib/functions';

import { AppBar, NavTabs } from './components';

const Stats = () => {
	const { data } = useSession();
	const { games, user } = useAppContext();

	const handleNavTabs = filter => Router.push(`/backlog?tab=${filter}`);

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
			<AppBar
				button={
					<Button startIcon={<ArrowBackIosNew />} onClick={() => Router.back()}>
						Back
					</Button>
				}
			/>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					height: { xs: '60vh', md: '100vh' },
					paddingLeft: { xs: 0, md: 31 },
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
						padding: 4,
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
						onClick={() => exportJson(user.name, games)}
					>
						Export Data
					</Button>
				</Box>
			</Box>
			<NavTabs setFilter={handleNavTabs} />
		</>
	);
};

export default Stats;
