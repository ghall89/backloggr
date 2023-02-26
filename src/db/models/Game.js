const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gameSchema = new Schema({
	igdb_id: String,
	added: Date,
	updated: Date,
	title: String,
	platform: String,
	img: String,
	genres: Array,
	release_dt: String,
	user_ref: String,
	status: String,
	starred: Boolean,
	replaying: Boolean,
	archived: Boolean,
});

module.exports = mongoose.models.Game || mongoose.model('Game', gameSchema);
