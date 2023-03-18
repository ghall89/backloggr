const mongoose = require('mongoose')

const { Schema } = mongoose

const gameSchema = new Schema({
	igdb_id: String,
	added: Date,
	updated: Date,
	title: String,
	platform: String,
	img: String,
	genres: Array,
	user_ref: String,
	status: {
		type: String,
		enum: ['not_started', 'in_progress', 'finished', 'completed'],
		default: 'not_started',
	},
	starred: Boolean,
	replaying: Boolean,
	archived: Boolean,
})

module.exports = mongoose.models.Game || mongoose.model('Game', gameSchema)
