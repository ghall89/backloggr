const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
	username: String,
	img_url: String,
	auth_id: String,
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
