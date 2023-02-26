import { getToken } from 'next-auth/jwt';
import dbConnect from '../../src/db/dbConnect';
const CachedItem = require('../../src/db/models/CachedItem');

export default async function handler(req, res) {
	const token = await getToken({ req });

	if (token) {
		await dbConnect();

		let result;
		try {
			const dbGame = await CachedItem.find({ igdb_id: { $eq: req.query.id } });
			console.log(dbGame);
			if (dbGame.length === 0) {
				console.log('saving game to cache');
				const igdbGame = await fetch(
					`/api/igdbApi?search=${req.query.id}&action=gameById`,
				);
				let cachedItem = new CachedItem({
					igdb_id: igdbGame.id,
					cached: new Date(),
					title: igdbGame.title,
					platforms: igdbGame.platforms,
					genres: igdbGame.genres,
					artworks: igdbGame.artworks,
					screenshots: igdbGame.screenshots,
					similar_games: igdbGame.similar_games,
					storyline: igdbGame.storyline,
					summary: igdbGame.summary,
					videos: igdbGame.videos,
				});

				result = cachedItem;

				cachedItem = await cachedItem.save();
			} else {
				console.log('retrieving game from cache');
				result = dbGame;
			}
		} catch (err) {
			res.status(400).json({
				success: false,
				message: err,
			});
		} finally {
			res.status(200).json(result);
		}
	} else {
		console.log('Unauthorized API call');
		res.status(401).json({ message: `It's a secret to everyone...` });
	}
}
