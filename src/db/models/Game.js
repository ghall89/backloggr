const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	user_name: 'String',
	password: 'String',
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
