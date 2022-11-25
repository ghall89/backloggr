import dbConnect from '../../src/db/dbConnect';
const Game = require('../../src/db/models/Game');

export default async function handler(req, res) {
	const { method, body } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			let query = { user_ref: req.query.user_ref };

			if (req.query.filter) {
				query = { ...query, status: req.query.filter };
			}

			if (req.query.id) {
				query = { ...query, _id: { $eq: req.query.id } };
			}

			try {
				let games = await Game.find(query);
				res.status(200).json({
					success: true,
					data: games,
				});
			} catch (err) {
				res.status(400).json({
					success: false,
					data: err,
				});
			}
			break;
		case 'POST':
			try {
				let game = new Game(req.body);
				game = await game.save();
				res.status(200).json({
					success: true,
					data: game,
				});
			} catch (err) {
				res.status(400).json({
					success: false,
				});
			}
			break;
		case 'PUT':
			try {
				let game = await Game.findByIdAndUpdate(body.id, body.params, {
					new: true,
				});

				res.status(200).json({
					success: true,
					data: game,
				});
			} catch (err) {
				res.status(400).json({
					success: false,
				});
			}
			break;
		case 'DELETE':
			try {
				let games = await Game.findByIdAndRemove(body.id);
				res.status(200).json({
					success: true,
					message: `${games.title} deleted!`,
				});
			} catch (err) {
				res.status(400).json({
					success: false,
				});
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
