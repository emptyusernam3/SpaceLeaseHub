const { Service } = require('../models/models')

class ServiceController {
	async create(req, res) {
		try {
			const { name, price, description, facilityFacilityId } = req.body
			const service = await Service.create({ name, price, description, facilityFacilityId })
			res.json(service)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const services = await Service.findAll()
			res.json(services)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params
			const service = await Service.findByPk(id)
			if (!service) {
				return res.status(404).json({ message: 'Service not found' })
			}
			res.json(service)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getByFacilityId(req, res) {
		try {
			const { id } = req.params
			const service = await Service.findAll({
				where: { facilityFacilityId: id },
			})
			if (!service) {
				return res.status(404).json({ message: 'Service not found' })
			}
			res.json(service)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params
			const { name, price, description } = req.body
			const service = await Service.update({ name, price, description }, { where: { service_id: id } })
			res.json(service)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await Service.destroy({ where: { service_id: id } })
			res.json({ message: 'Service deleted successfully' })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}

module.exports = {
	ServiceController: new ServiceController(),
}
