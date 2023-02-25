import { getToken } from 'next-auth/jwt'
import dbConnect from '@db/dbConnect'
const User = require('@db/models/User')

export default async function handler(req, res) {
	const token = await getToken({ req })

	if (token) {
		const { method, body } = req

		await dbConnect()

		switch (method) {
			case 'GET':
				try {
					let user = await User.find({ auth_id: req.query.user_ref }).select(
						'-auth_id'
					)
					res.status(200).json({
						success: true,
						data: user,
					})
				} catch (err) {
					res.status(400).json({
						success: false,
					})
				}
				break
			case 'POST':
				try {
					let user = new User(req.body)
					user = await user.save()
					res.status(200).json({
						success: true,
						data: user,
					})
				} catch (err) {
					res.status(400).json({
						success: false,
					})
				}
				break
			case 'PUT':
				try {
					let user = await User.findByIdAndUpdate(body.id, body.params, {
						new: true,
					})

					res.status(200).json({
						success: true,
						data: user,
					})
				} catch (err) {
					res.status(400).json({
						success: false,
					})
				}

				break
		}
	} else {
		console.log('Unauthorized API call')
		res.status(401).json({ message: `It's a secret to everyone...` })
	}
}
