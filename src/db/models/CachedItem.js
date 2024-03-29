const mongoose = require('mongoose')

const { Schema } = mongoose

const cachedItemSchema = new Schema({
	igdb_id: String,
	cached: Date,
	title: String,
	platforms: Array,
	genres: Array,
	artworks: Array,
	screenshots: Array,
	similar_games: Array,
	storyline: String,
	summary: String,
	videos: Array,
})

module.exports =
	mongoose.models.CachedItem || mongoose.model('CachedItem', cachedItemSchema)
