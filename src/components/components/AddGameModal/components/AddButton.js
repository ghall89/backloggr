import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import {
	Button,
	ButtonGroup,
	Popper,
	Grow,
	Paper,
	ClickAwayListener,
	MenuItem,
	MenuList,
} from '@mui/material'
import { Add, MoreHoriz } from '@mui/icons-material'

const options = [
	{ option: 'Add to Playing', status: 'in_progress' },
	{ option: 'Add to Finished', status: 'finished' },
	{ option: 'Add to Completed', status: 'completed' },
]

const AddButton = ({ handleSubmit }) => {
	const [open, setOpen] = useState(false)
	const anchorRef = useRef(null)
	const [selectedIndex, setSelectedIndex] = useState(1)

	const handleClick = () => {
		console.info(`You clicked ${options[selectedIndex]}`)
	}

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index)
		setOpen(false)
	}

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen)
	}

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}

		setOpen(false)
	}

	return (
		<>
			<ButtonGroup variant="contained">
				<Button
					onClick={() => handleSubmit('not_started')}
					variant="contained"
					fullWidth
					startIcon={<Add />}
				>
					Add Game
				</Button>
				<Button
					size="small"
					ref={anchorRef}
					id="composition-button"
					aria-controls={open ? 'composition-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
				>
					<MoreHoriz />
				</Button>
			</ButtonGroup>
			<Popper
				sx={{
					zIndex: 1,
				}}
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom' ? 'center top' : 'center bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id="split-button-menu" autoFocusItem>
									{options.map(({ option, status }) => (
										<MenuItem key={option} onClick={() => handleSubmit(status)}>
											{option}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	)
}

AddButton.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
}

export default AddButton
