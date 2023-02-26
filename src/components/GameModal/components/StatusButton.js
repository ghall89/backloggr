import { Button } from '@mui/material'
import { CheckBox, EmojiEvents, SportsEsports } from '@mui/icons-material'

const StatusButton = ({ gameStatus }) => {
	switch (gameStatus) {
		case 'not_started':
			return (
				<Button
					fullWidth
					variant="contained"
					onClick={() => setStatus(game._id, 'in_progress')}
					startIcon={<SportsEsports />}
				>
					Playing
				</Button>
			)
		case 'in_progress':
			return (
				<Button
					fullWidth
					variant="contained"
					onClick={() => setStatus(game._id, 'finished')}
					startIcon={<CheckBox />}
				>
					Finished
				</Button>
			)
		case 'finished':
			return (
				<Button
					fullWidth
					variant="contained"
					onClick={() => setStatus(game._id, 'completed')}
					startIcon={<EmojiEvents />}
				>
					Completed
				</Button>
			)
		case 'completed':
		default:
			return
	}
}

export default StatusButton
