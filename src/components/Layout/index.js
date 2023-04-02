import { Button, Navbar, Link, Text, Avatar, Dropdown } from '@nextui-org/react'

import { signIn, useSession } from 'next-auth/react'
import { useAppContext } from '../../AppContext'

const Layout = ({ children }) => {
	const { status } = useSession()
	const { user } = useAppContext()

	const collapseItems = [
		'Profile',
		'Dashboard',
		'Activity',
		'Analytics',
		'System',
		'Deployments',
		'My Settings',
		'Team Settings',
		'Help & Feedback',
		'Log Out',
	]

	return (
		<div>
			<Navbar isBordered variant="sticky">
				<Navbar.Toggle showIn="xs" />
				<Navbar.Content
					enableCursorHighlight
					activeColor="primary"
					hideIn="xs"
					variant="highlight-rounded"
				>
					<Navbar.Link href="#">Features</Navbar.Link>
					<Navbar.Link isActive href="#">
						Customers
					</Navbar.Link>
					<Navbar.Link href="#">Pricing</Navbar.Link>
					<Navbar.Link href="#">Company</Navbar.Link>
				</Navbar.Content>
				<Navbar.Content
					css={{
						'@xs': {
							w: '12%',
							jc: 'flex-end',
						},
					}}
				>
					{status === 'authenticated' ? (
						<Dropdown placement="bottom-right">
							<Navbar.Item>
								<Dropdown.Trigger>
									<Avatar
										bordered
										as="button"
										color="primary"
										size="md"
										src={user.image}
									/>
								</Dropdown.Trigger>
							</Navbar.Item>
							<Dropdown.Menu
								aria-label="User menu actions"
								color="primary"
								onAction={(actionKey) => console.log({ actionKey })}
							>
								<Dropdown.Item key="logout" withDivider color="error">
									Log Out
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					) : (
						<Navbar.Item>
							<Button auto flat onClick={() => signIn('discord')}>
								Log In With Discord
							</Button>
						</Navbar.Item>
					)}
				</Navbar.Content>
				<Navbar.Collapse>
					{collapseItems.map((item, index) => (
						<Navbar.CollapseItem
							key={item}
							activeColor="primary"
							css={{
								color: index === collapseItems.length - 1 ? '$error' : '',
							}}
							isActive={index === 2}
						>
							<Link
								color="inherit"
								css={{
									minWidth: '100%',
								}}
								href="#"
							>
								{item}
							</Link>
						</Navbar.CollapseItem>
					))}
				</Navbar.Collapse>
			</Navbar>
			{children}
		</div>
	)
}

export default Layout
