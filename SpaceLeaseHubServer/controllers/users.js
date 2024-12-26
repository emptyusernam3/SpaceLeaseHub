const { User } = require('../models/models')

class UserController {
	async create(req, res) {
		try {
			const { role, email, password } = req.body
			const user = await User.create({ role, email, password })
			res.json(user)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const users = await User.findAll()
			res.json(users)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params
			const user = await User.findByPk(id)
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}
			res.json(user)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getByEmail(req, res) {
		try {
			const { email } = req.params
			const user = await User.findOne({
				where: { email: email },
			})
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}
			res.json(user)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getByEmailAndPassword(req, res) {
		try {
			const { email, password } = req.body
			const user = await User.findOne({
				where: { email: email, password: password },
			})
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}
			res.json(user)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params
			const { role, email, password } = req.body
			const user = await User.update({ role, email, password }, { where: { user_id: id } })
			res.json(user)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await User.destroy({ where: { user_id: id } })
			res.json({ message: 'User deleted successfully' })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}

module.exports = {
	UserController: new UserController(),
}
