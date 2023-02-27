import PropTypes from 'prop-types'

import { Button } from '@mui/material'
import { CheckBox, EmojiEvents, SportsEsports } from '@mui/icons-material'

import { useAppContext } from '/src/AppContext'

const StatusButton = ({ gameStatus, setStatus, game }) => {
	const { handleApi } = useAppContext()

	switch (gameStatus) {
		case 'not_started':
			return (
				<Button
					fullWidth
					variant="contained"
					onClick={() => setStatus(game._id, 'in_progress', null, handleApi)}
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
					onClick={() => setStatus(game._id, 'finished', null, handleApi)}
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
					onClick={() => setStatus(game._id, 'completed', null, handleApi)}
					startIcon={<EmojiEvents />}
				>
					Completed
				</Button>
			)
		case 'completed':
		default:
	}
}

StatusButton.propTypes = {
	gameStatus: PropTypes.string.isRequired,
	setStatus: PropTypes.func.isRequired,
	game: PropTypes.object.isRequired,
}

export default StatusButton
