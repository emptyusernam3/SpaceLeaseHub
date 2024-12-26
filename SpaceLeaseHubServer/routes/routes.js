const express = require('express')
const {
	HolderController,
	UserController,
	ClientController,
	ContractController,
	ReviewController,
	FacilityController,
	ServiceController,
	EventController,
} = require('../controllers/controllers')

const router = express.Router()

router.post('/holders', HolderController.create)
router.get('/holders', HolderController.getAll)
router.get('/holders/:id', HolderController.getById)
router.get('/holders/userId/:userUserId', HolderController.getByUserId)
router.put('/holders/:id', HolderController.update)
router.delete('/holders/:id', HolderController.delete)

// User routes
router.post('/users', UserController.create)
router.get('/users', UserController.getAll)
router.get('/users/:id', UserController.getById)
router.get('/users/email/:email', UserController.getByEmail)
router.post('/users/auth', UserController.getByEmailAndPassword)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)

// Client routes
router.post('/clients', ClientController.create)
router.get('/clients', ClientController.getAll)
router.get('/clients/:id', ClientController.getById)
router.get('/clients/userId/:userUserId', ClientController.getByUserId)
router.put('/clients/:id', ClientController.update)
router.delete('/clients/:id', ClientController.delete)

// Contract routes
router.post('/contracts', ContractController.create)
router.get('/contracts', ContractController.getAll)
router.get('/contracts/:id', ContractController.getById)
router.get('/contracts/client/:id', ContractController.getByClientId)
router.put('/contracts/:id', ContractController.update)
router.delete('/contracts/:id', ContractController.delete)

// Review routes
router.post('/reviews', ReviewController.create)
router.get('/reviews', ReviewController.getAll)
router.get('/reviews/:id', ReviewController.getById)
router.get('/reviews/facility/:id', ReviewController.getByFacilityId)
router.put('/reviews/:id', ReviewController.update)
router.delete('/reviews/:id', ReviewController.delete)

// Facility routes
router.post('/facilities', FacilityController.create)
router.get('/facilities', FacilityController.getAll)
router.get('/facilities/:id', FacilityController.getById)
router.get('/facilities/holder/:id', FacilityController.getByHolderId)
router.put('/facilities/:id', FacilityController.update)
router.delete('/facilities/:id', FacilityController.delete)

// Service routes
router.post('/services', ServiceController.create)
router.get('/services', ServiceController.getAll)
router.get('/services/:id', ServiceController.getById)
router.get('/services/facility/:id', ServiceController.getByFacilityId)
router.put('/services/:id', ServiceController.update)
router.delete('/services/:id', ServiceController.delete)

// Event routes
router.post('/events', EventController.create)
router.get('/events', EventController.getAll)
router.get('/events/:id', EventController.getById)
router.get('/events/facility/:id', EventController.getByFacilityId)
router.put('/events/:id', EventController.update)
router.delete('/events/:id', EventController.delete)

module.exports = router
