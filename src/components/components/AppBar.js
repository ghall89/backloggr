import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Router from 'next/router';

import {
	AppBar,
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
} from '@mui/material';
import {
	AccountCircle,
	BarChart,
	Logout,
	ManageAccounts,
} from '@mui/icons-material';

const AppBarComponent = () => {
	const { user } = useUser();

	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<AppBar position="fixed" sx={{ backgroundColor: '#24273a' }}>
			<Toolbar>
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1 }}
					href="/backlog"
				>
					{user ? `${user.nickname}'s Backlog` : 'Backloggr'}
				</Typography>
				{!user ? null : (
					<div>
						<IconButton
							ref={anchorRef}
							id="composition-button"
							aria-controls={open ? 'composition-menu' : undefined}
							aria-expanded={open ? 'true' : undefined}
							aria-haspopup="true"
							onClick={handleToggle}
							size="medium"
						>
							{!user.picture ? (
								<AccountCircle fontSize="inherit" />
							) : (
								<Image
									src={user?.picture}
									alt={`${user?.nickname}'s avatar`}
									width={35}
									height={35}
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
											placement === 'bottom-start' ? 'left top' : 'left bottom',
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
												<MenuItem onClick={() => Router.push('/stats')}>
													<ListItemIcon>
														<BarChart fontSize="small" />
													</ListItemIcon>
													<ListItemText>Stats</ListItemText>
												</MenuItem>
												<MenuItem
													onClick={() => Router.push('/api/auth/logout')}
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
		</AppBar>
	);
};

export default AppBarComponent;
