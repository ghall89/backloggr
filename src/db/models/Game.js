const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gameSchema = new Schema({
	rawg_id: String,
	title: String,
	platform: String,
	img: String,
	avg_playtime: Number,
	metacritic: String,
	genres: Array,
	release_dt: String,
	user_ref: String,
	status: String,
	starred: Boolean,
});

module.exports = mongoose.models.Game || mongoose.model('Game', gameSchema);
