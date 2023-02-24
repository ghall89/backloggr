import { Box, Dialog, Typography } from '@mui/material'

const Loading = ({ loading }) => (
	<Dialog open={loading}>
		<Box sx={{ padding: 2 }}>
			<img width="100%" src="/img/loading.gif" alt="loading" />
		</Box>
	</Dialog>
)

export default Loading
