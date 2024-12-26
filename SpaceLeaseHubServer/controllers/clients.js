const { Client } = require('../models/models')
class ClientController {
	async create(req, res) {
		try {
			const { name, phone, email, userUserId } = req.body
			const client = await Client.create({ name, phone, email, userUserId })
			res.json(client)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const clients = await Client.findAll()
			res.json(clients)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params
			const client = await Client.findByPk(id)
			if (!client) {
				return res.status(404).json({ message: 'Client not found' })
			}
			res.json(client)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getByUserId(req, res) {
		try {
			const { userUserId } = req.params
			const client = await Client.findOne({
				where: { userUserId: userUserId },
			})
			if (!client) {
				return res.status(404).json({ message: 'client not found' })
			}
			res.json(client)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params
			const { name, phone, email } = req.body
			const client = await Client.update({ name, phone, email }, { where: { client_id: id } })
			res.json(client)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await Client.destroy({ where: { client_id: id } })
			res.json({ message: 'Client deleted successfully' })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}
module.exports = {
	ClientController: new ClientController(),
}
