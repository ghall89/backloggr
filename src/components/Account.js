import { useMemo, useCallback } from 'react'

import { Avatar, Box, Button, Grid, Typography } from '@mui/material'

import { useAppContext } from '../AppContext'
import Layout from './Layout'

import { exportJson } from '../lib/functions'
import percentageCalc from '../lib/percentageCalc'

// const handleSaveUsername = async (id, newName) => {
// 	const body = {
// 		id,
// 		params: { username: newName },
// 	}
//
// 	const res = fetch('/api/users', {
// 		method: 'PUT',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(body),
// 	})
// }
const Account = () => {
	const { games, user, userData } = useAppContext()

	// const [usernameField, setUsernameField] = useState()

	const percentCallback = useCallback(
		(status) => percentageCalc(status, games),
		[games]
	)

	const finishedPercentMemo = useMemo(
		() => percentCallback('finished'),
		[percentCallback]
	)
	const completedPercentMemo = useMemo(
		() => percentCallback('completed'),
		[percentCallback]
	)

	// 	const handleUsername = ({ target }) => setUsernameField(target.value)
	//
	// 	const saveUsername = () => handleSaveUsername(userData.id, usernameField)

	return (
		<Layout>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: { xs: '60vh', md: '100vh' },
					gap: 6,
				}}
			>
				<Avatar src={userData?.img_url} sx={{ height: 100, width: 100 }} />
				<Typography variant="h5">{userData?.username}</Typography>
				{/* <Box sx={{ display: 'flex', gap: 2 }}>
					<FormControl>
						<TextField
							size="small"
							defaultValue={userData.username}
							label="Username"
							onChange={handleUsername}
						/>
					</FormControl>
					<Button variant="contained" onClick={saveUsername}>
						Save
					</Button>
				</Box> */}

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
					<Typography variant="h4">Your Data</Typography>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<Typography sx={{ fontSize: 40 }}>
								{games?.length || 0}
							</Typography>
							<Typography>Total Games</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography sx={{ fontSize: 40 }}>
								{`${finishedPercentMemo}%`}
							</Typography>
							<Typography>Finished</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography sx={{ fontSize: 40 }}>
								{`${completedPercentMemo}%`}
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
		</Layout>
	)
}

export default Account
