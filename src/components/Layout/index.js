import { Box } from '@mui/material'

import { AppBar, NavTabs } from './components'

const Layout = ({ children, title }) => (
	<>
		<AppBar title={title} />
		<Box sx={{ paddingLeft: { xs: 0, md: 31 } }}>{children}</Box>
		<NavTabs />
	</>
)

export default Layout
