const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gameSchema = new Schema({
	title: String,
	platform: String,
	user_ref: String,
	status: String,
	user_ref: Schema.Types.ObjectId,
});

module.exports = mongoose.models.Game || mongoose.model('Game', gameSchema);
