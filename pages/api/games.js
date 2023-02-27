import { getToken } from 'next-auth/jwt'
import dbConnect from '@db/dbConnect'

const Game = require('@db/models/Game')

export default async function handler(req, res) {
	const token = await getToken({ req })

	if (token) {
		const { method, body } = req

		await dbConnect()
		let query = { user_ref: req.query.user_ref }

		switch (method) {
			case 'GET':
				if (req.query.filter) {
					query = { ...query, status: req.query.filter }
				}

				if (req.query.id) {
					query = { ...query, _id: { $eq: req.query.id } }
				}

				try {
					const games = await Game.find(query)
						.sort({ title: 1 })
						.select('-user_ref')
					res.status(200).json({
						success: true,
						data: games,
					})
				} catch (err) {
					res.status(400).json({
						success: false,
						data: err,
					})
				}
				break
			case 'POST':
				try {
					let game = new Game(req.body)
					game = await game.save()
					res.status(200).json({
						success: true,
						data: game,
					})
				} catch (err) {
					res.status(400).json({
						success: false,
					})
				}
				break
			case 'PUT':
				try {
					const game = await Game.findByIdAndUpdate(body.id, body.params, {
						new: true,
					})

					res.status(200).json({
						success: true,
						data: game,
					})
				} catch (err) {
					res.status(400).json({
						success: false,
					})
				}
				break
			case 'DELETE':
				try {
					const games = await Game.findByIdAndRemove(body.id)
					res.status(200).json({
						success: true,
						message: `${games.title} deleted!`,
					})
				} catch (err) {
					res.status(400).json({
						success: false,
					})
				}
				break
			default:
				res.status(400).json({ success: false })
				break
		}
	} else {
		res.status(401).json({ message: "It's a secret to everyone..." })
	}
}
