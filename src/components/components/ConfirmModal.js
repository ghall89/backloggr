import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

const ConfirmModal = ({ open, setOpen, confirmAction }) => {
	const handleConfirm = async () => {
		await confirmAction();
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{'Delete game?'}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					If you delete this game, it wll be deleted forever and have to be
					added back manually.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={() => setOpen(false)}>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="error"
					onClick={() => handleConfirm()}
					autoFocus
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmModal;
