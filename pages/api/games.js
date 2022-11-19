import dbConnect from '../../src/db/dbConnect';
const Game = require('../../src/db/models/Game');

export default async function handler(req, res) {
	const { method, body } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				let games = await Game.find();
				res.status(200).json({
					success: true,
					data: games,
				});
			} catch (err) {
				res.status(400).json({
					success: false,
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

// router.post('/', async (req, res) => {
// 	try {
// 		let game = new Game(req.body);
// 		game = await game.save();
// 		res.status(200).json({
// 			status: 200,
// 			data: game,
// 		});
// 	} catch (err) {
// 		res.status(400).json({
// 			status: 400,
// 			message: err.message,
// 		});
// 	}
// });
//
// router.get('/', async (req, res) => {
// 	try {
// 		let games = await Game.find();
// 		res.status(200).json({
// 			status: 200,
// 			data: games,
// 		});
// 	} catch (err) {
// 		res.status(400).json({
// 			status: 400,
// 			message: err.message,
// 		});
// 	}
// });
//
// router.get('/find', async (req, res) => {
// 	const { body } = req;
// 	try {
// 		let games = await Game.find({ _id: body.id });
// 		res.status(200).json({
// 			status: 200,
// 			data: games,
// 		});
// 	} catch (err) {
// 		res.status(400).json({
// 			status: 400,
// 			message: err.message,
// 		});
// 	}
// });
//
// router.put('/', async (req, res) => {
// 	const { body } = req;
//
// 	try {
// 		let game = await Game.findByIdAndUpdate(body.id, body.params, {
// 			new: true,
// 		});
//
// 		res.status(200).json({
// 			status: 200,
// 			data: game,
// 		});
// 	} catch (err) {
// 		res.status(400).json({
// 			status: 400,
// 			message: err.message,
// 		});
// 	}
// });
//
// router.delete('/', async (req, res) => {
// 	const { body } = req;
//
// 	try {
// 		let games = await Game.findByIdAndRemove(body.id);
// 		res.status(200).json({
// 			status: 200,
// 			message: `${games.title} deleted!`,
// 		});
// 	} catch (err) {
// 		res.status(400).json({
// 			status: 400,
// 			message: err.message,
// 		});
// 	}
// });
//
// module.exports = router;
