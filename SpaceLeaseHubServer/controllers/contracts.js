const { Contract } = require('../models/models')

class ContractController {
	async create(req, res) {
		try {
			const { date, clientClientId, holderHolderId, facilityFacilityId } = req.body
			const contract = await Contract.create({ date, clientClientId, holderHolderId, facilityFacilityId })
			res.json(contract)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const contracts = await Contract.findAll()
			res.json(contracts)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params
			const contract = await Contract.findByPk(id)
			if (!contract) {
				return res.status(404).json({ message: 'Contract not found' })
			}
			res.json(contract)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getByClientId(req, res) {
		try {
			const { id } = req.params
			const contract = await Contract.findAll({
				where: { clientClientId: id },
			})
			if (!contract) {
				return res.status(404).json({ message: 'Contract not found' })
			}
			res.json(contract)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params
			const { date } = req.body
			const contract = await Contract.update({ date }, { where: { contract_id: id } })
			res.json(contract)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await Contract.destroy({ where: { contract_id: id } })
			res.json({ message: 'Contract deleted successfully' })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}

module.exports = {
	ContractController: new ContractController(),
}
