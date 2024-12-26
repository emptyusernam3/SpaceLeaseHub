const { Facility } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class FacilityController {
	async create(req, res) {
		try {
			const { name, area, price, status, holderHolderId } = req.body
			const { picture } = req.files

			let fileName = uuid.v4() + '.jpg'
			picture.mv(path.resolve(__dirname, '..', 'static', fileName))

			console.log('\n file created')

			const facility = await Facility.create({ name, area, price, status, picture: fileName, holderHolderId })
			res.json(facility)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const facilities = await Facility.findAll()
			res.json(facilities)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params
			const facility = await Facility.findByPk(id)
			if (!facility) {
				return res.status(404).json({ message: 'Facility not found' })
			}
			res.json(facility)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getByHolderId(req, res) {
		try {
			const { id } = req.params
			const facility = await Facility.findAll({
				where: { holderHolderId: id },
			})
			if (!facility) {
				return res.status(404).json({ message: 'Facility not found' })
			}
			res.json(facility)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params
			const { name, area, price, status } = req.body
			const facility = await Facility.update({ name, area, price, status }, { where: { facility_id: id } })
			res.json(facility)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			const facility = await Facility.findOne({ where: { facility_id: id } })

			const file_path = path.resolve(__dirname, '..', 'static', facility.picture)
			fs.unlinkSync(file_path)

			await Facility.destroy({ where: { facility_id: id } })
			res.json({ message: 'Facility deleted successfully' })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}
module.exports = {
	FacilityController: new FacilityController(),
}
