import PropTypes from 'prop-types'

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'

const ConfirmModal = ({ open, setOpen, confirmAction, closeGameModal }) => {
	const handleConfirm = async () => {
		await confirmAction()
		setOpen(false)
		closeGameModal()
	}

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Delete game?</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					If you delete this game, it will be deleted forever and have to be
					added back manually.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={() => setOpen(false)} fullWidth>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="error"
					onClick={() => handleConfirm()}
					autoFocus
					fullWidth
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	)
}

ConfirmModal.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	confirmAction: PropTypes.func.isRequired,
	closeGameModal: PropTypes.func.isRequired,
}

export default ConfirmModal
