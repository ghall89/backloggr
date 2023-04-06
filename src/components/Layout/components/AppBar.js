import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import {
	Button,
	Navbar,
	Link,
	Avatar,
	Dropdown,
	Image,
} from '@nextui-org/react'

import { signIn } from 'next-auth/react'

const AppBar = ({ user, status }) => {
	const { route } = useRouter()

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

	const links = [
		{
			label: 'Dashboard',
			href: '/',
		},
		{
			label: 'Collection',
			href: '/collection',
		},
		{
			label: 'Search',
			href: '/search',
		},
	]

	return (
		<Navbar isBordered variant="sticky">
			<Navbar.Toggle showIn="xs" />
			<Navbar.Brand>
				<Image src="/img/backloggr_logo.png" width={120} />
			</Navbar.Brand>
			<Navbar.Content
				enableCursorHighlight
				activeColor="primary"
				hideIn="xs"
				variant="highlight-rounded"
			>
				{links.map(({ label, href }) => (
					<Navbar.Link isActive={route === href} href={href}>
						{label}
					</Navbar.Link>
				))}
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
	)
}

AppBar.propTypes = {
	user: PropTypes.object.isRequired,
	status: PropTypes.string.isRequired,
}

export default AppBar
