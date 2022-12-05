import { useUser } from '@auth0/nextjs-auth0';
import { Typography } from '@mui/material';

const Settings = () => {
	const { user } = useUser();

	console.log(user);

	return (
		<>
			<Typography>Hello settings!</Typography>
		</>
	);
};

export default Settings;
