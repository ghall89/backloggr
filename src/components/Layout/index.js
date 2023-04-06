import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react'
import { useAppContext } from '../../AppContext'

import AppBar from './components/AppBar'

const Layout = ({ children }) => {
	const { status } = useSession()
	const { user } = useAppContext()

	return (
		<div>
			<AppBar user={user} status={status} />
			{children}
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.object.isRequired,
}

export default Layout
