const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gameSchema = new Schema({
	title: String,
	publisher: String,
	developer: String,
	genre: String,
	platform: String,
});

module.exports = mongoose.models.Game || mongoose.model('Game', gameSchema);

//
// let Game = mongoose.model('game', gameSchema);
//
// module.exports = Game;
