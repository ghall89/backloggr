import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useSession } from 'next-auth/react'

import { Box } from '@mui/material'
import Login from '@components/Login'
import { AppBar, NavTabs } from './components'

const Layout = ({ children, title }) => {
	const { status } = useSession()

	const authMemo = useMemo(() => status !== 'authenticated', [status])

	return (
		<>
			<AppBar title={title} />
			{authMemo ? null : (
				<Box sx={{ paddingLeft: { xs: 0, md: 31 } }}>{children}</Box>
			)}
			<NavTabs />
			<Login open={authMemo} />
		</>
	)
}

Layout.propTypes = {
	children: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
}

export default Layout
