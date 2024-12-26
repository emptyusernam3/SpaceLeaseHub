const { Review } = require('../models/models')
class ReviewController {
	async create(req, res) {
		try {
			const { comment, rate, clientClientId, facilityFacilityId } = req.body
			const review = await Review.create({ comment, rate, clientClientId, facilityFacilityId })
			res.json(review)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const reviews = await Review.findAll()
			res.json(reviews)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params
			const review = await Review.findByPk(id)
			if (!review) {
				return res.status(404).json({ message: 'Review not found' })
			}
			res.json(review)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getByFacilityId(req, res) {
		try {
			const { id } = req.params
			const review = await Review.findAll({ where: { facilityFacilityId: id } })
			if (!review) {
				return res.status(404).json({ message: 'Review not found' })
			}
			res.json(review)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params
			const { comment, rate } = req.body
			const review = await Review.update({ comment, rate }, { where: { review_id: id } })
			res.json(review)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params
			await Review.destroy({ where: { review_id: id } })
			res.json({ message: 'Review deleted successfully' })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}

module.exports = {
	ReviewController: new ReviewController(),
}
