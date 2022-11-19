const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
	game_ref: mongoose.ObjectId,
	started: Boolean,
	finished: Boolean,
	completed: Boolean,
});

const playerSchema = new Schema({
	username: String,
	games: [listSchema],
});

const Player = mongoose.model('player', playerSchema);

module.exports = Player;
