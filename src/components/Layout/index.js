import { useMemo } from 'react'
import { useSession } from 'next-auth/react'

import { Box } from '@mui/material'
import { AppBar, NavTabs } from './components'

import Login from '@components/Login'

const Layout = ({ children, title }) => {
	const { data, status } = useSession()

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

export default Layout
