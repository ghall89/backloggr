import PropTypes from 'prop-types'
import Image from 'next/image'

import { Box, Dialog } from '@mui/material'

const Loading = ({ loading }) => (
	<Dialog open={loading}>
		<Box sx={{ padding: 2 }}>
			<Image width={250} height={226} src="/img/loading.gif" alt="loading" />
		</Box>
	</Dialog>
)

Loading.propTypes = {
	loading: PropTypes.bool.isRequired,
}

export default Loading
