const { Event } = require('../models/models')

class EventController {
	async create(req, res) {
		try {
			const { name, date, description, type, facilityFacilityId } = req.body
			const event = await Event.create({ name, date, description, type, facilityFacilityId })
			res.json(event)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const events = await Event.findAll()
			res.json(events)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params
			const event = await Event.findByPk(id)
			if (!event) {
				return res.status(404).json({ message: 'Event not found' })
			}
			res.json(event)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getByFacilityId(req, res) {
		try {
			const { id } = req.params
			const event = await Event.findAll({ where: { facilityFacilityId: id } })
			if (!event) {
				return res.status(404).json({ message: 'Event not found' })
			}
			res.json(event)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params
			const { name, date, description, type } = req.body
			const event = await Event.update({ name, date, description, type }, { where: { event_id: id } })
			res.json(event)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await Event.destroy({ where: { event_id: id } })
			res.json({ message: 'Event deleted successfully' })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}
module.exports = {
	EventController: new EventController(),
}
