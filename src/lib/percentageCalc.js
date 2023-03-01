const percentageCalc = (status, games) => {
	if (games) {
		let total = 0
		games?.forEach((game) => {
			if (game.status === status) {
				total += 1
			}
		})
		const percentage = Math.round((100 * total) / games.length)
		if (Number.isNaN(percentage)) {
			return 0
		}
		return percentage
	}
	return 0
}

export default percentageCalc
