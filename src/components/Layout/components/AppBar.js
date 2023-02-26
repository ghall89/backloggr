import { useSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'
import Router from 'next/router'

import { useTheme } from '@mui/styles'

import {
	ClickAwayListener,
	Grow,
	IconButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material'
import { AccountCircle, Coffee, Logout } from '@mui/icons-material'

const AppBarComponent = ({ title, button }) => {
	const { data, status } = useSession()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	const [open, setOpen] = useState(false)
	const anchorRef = useRef(null)

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen)
	}

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}

		setOpen(false)
	}

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault()
			setOpen(false)
		} else if (event.key === 'Escape') {
			setOpen(false)
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open)
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus()
		}

		prevOpen.current = open
	}, [open])

	return (
		<>
			{isMobile ? (
				<Toolbar sx={{ padding: 2, zIndex: 100 }}>
					<Typography
						variant="h4"
						component="div"
						sx={{ flexGrow: 1 }}
						href="/backlog"
					>
						{title ? title : ''}
						{button ? button : null}
					</Typography>
					{!data?.user ? null : (
						<div>
							<IconButton
								ref={anchorRef}
								id="composition-button"
								aria-controls={open ? 'composition-menu' : undefined}
								aria-expanded={open ? 'true' : undefined}
								aria-haspopup="true"
								onClick={handleToggle}
								size="large"
							>
								{!data?.user.image ? (
									<AccountCircle fontSize="inherit" />
								) : (
									<img
										src={data?.user.image}
										alt={`${data?.user.name}'s avatar`}
										width={45}
										height={45}
										style={{ borderRadius: 30 }}
									/>
								)}
							</IconButton>
							<Popper
								open={open}
								anchorEl={anchorRef.current}
								role={undefined}
								placement="bottom-start"
								transition
								disablePortal
							>
								{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										style={{
											transformOrigin:
												placement === 'bottom-start'
													? 'left top'
													: 'left bottom',
										}}
									>
										<Paper>
											<ClickAwayListener onClickAway={handleClose}>
												<MenuList
													autoFocusItem={open}
													id="user-menu"
													aria-labelledby="user-button"
													onKeyDown={handleListKeyDown}
												>
													<MenuItem onClick={() => Router.push('/account')}>
														<ListItemIcon>
															<AccountCircle fontSize="small" />
														</ListItemIcon>
														<ListItemText>Account</ListItemText>
													</MenuItem>
													<MenuItem
														onClick={() =>
															window.open('https://ko-fi.com/backloggr')
														}
													>
														<ListItemIcon>
															<Coffee fontSize="small" />
														</ListItemIcon>
														<ListItemText>Support on ko-fi</ListItemText>
													</MenuItem>
													<MenuItem
														onClick={() => Router.push('/api/auth/signout')}
													>
														<ListItemIcon>
															<Logout fontSize="small" />
														</ListItemIcon>
														<ListItemText>Logout</ListItemText>
													</MenuItem>
												</MenuList>
											</ClickAwayListener>
										</Paper>
									</Grow>
								)}
							</Popper>
						</div>
					)}
				</Toolbar>
			) : null}
		</>
	)
}

export default AppBarComponent
