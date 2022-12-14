import { useUser } from '@auth0/nextjs-auth0';
import { Box, Typography } from '@mui/material';

const Stats = () => {
	const { user } = useUser();

	console.log(user);

	return (
		<Box
			sx={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignContent: 'center',
				justifyContent: 'center',
			}}
		>
			<Typography>Coming soon!</Typography>
		</Box>
	);
};

export default Stats;
