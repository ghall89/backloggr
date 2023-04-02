import PropTypes from 'prop-types'
import { Backdrop } from '@mui/material'
import Image from 'next/image'

const Loader = ({ loading }) => (
	<Backdrop sx={{ color: '#fff', zIndex: 100 }} open={loading}>
		<Image src="/img/loading-coin.gif" alt="loading" width={75} height={75} />
	</Backdrop>
)

Loader.propTypes = {
	loading: PropTypes.bool.isRequired,
}

export default Loader
