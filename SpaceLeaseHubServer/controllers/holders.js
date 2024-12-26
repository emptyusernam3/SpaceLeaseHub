const { Holder } = require('../models/models')
class HolderController {
	async create(req, res) {
		try {
			const { name, phone, company, userUserId } = req.body
			const holder = await Holder.create({ name, phone, company, userUserId })
			res.json(holder)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const holders = await Holder.findAll()
			res.json(holders)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params
			const holder = await Holder.findByPk(id)
			if (!holder) {
				return res.status(404).json({ message: 'Holder not found' })
			}
			res.json(holder)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getByUserId(req, res) {
		try {
			const { userUserId } = req.params
			const holder = await Holder.findOne({
				where: { userUserId: userUserId },
			})
			if (!holder) {
				return res.status(404).json({ message: 'Holder not found' })
			}
			res.json(holder)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params
			const { name, phone, company } = req.body
			const holder = await Holder.update({ name, phone, company }, { where: { holder_id: id } })
			res.json(holder)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await Holder.destroy({ where: { holder_id: id } })
			res.json({ message: 'Holder deleted successfully' })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}
module.exports = {
	HolderController: new HolderController(),
}
