import dbConnect from '../dbConnect';
const Player = require('../models/Player');

router.post('/', async (req, res) => {
	try {
		let player = new Player(req.body);
		player = await player.save();
		res.status(200).json({
			status: 200,
			data: player,
		});
	} catch (err) {
		res.status(400).json({
			status: 400,
			message: err.message,
		});
	}
});

router.get('/', async (req, res) => {
	try {
		let players = await Player.find();
		res.status(200).json({
			status: 200,
			data: players,
		});
	} catch (err) {
		res.status(400).json({
			status: 400,
			message: err.message,
		});
	}
});

router.put('/', async (req, res) => {
	const { body } = req;

	try {
		const currentPlayer = await Player.find({ _id: body.id });

		const newPlayer = {
			username: currentPlayer.username,
			games: [...games, body.params],
		};

		let player = await Player.findByIdAndUpdate(body.id, body.params, {
			new: true,
		});

		res.status(200).json({
			status: 200,
			data: player,
		});
	} catch (err) {
		res.status(400).json({
			status: 400,
			message: err.message,
		});
	}
});

module.exports = router;
