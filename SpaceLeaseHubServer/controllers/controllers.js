const { UserController } = require('./users')
const { ClientController } = require('./clients')
const { HolderController } = require('./holders')
const { ContractController } = require('./contracts')
const { FacilityController } = require('./facilities')
const { ReviewController } = require('./reviews')
const { ServiceController } = require('./services')
const { EventController } = require('./events')

// Exporting all controllers
module.exports = {
	HolderController: HolderController,
	UserController: UserController,
	ClientController: ClientController,
	ContractController: ContractController,
	ReviewController: ReviewController,
	FacilityController: FacilityController,
	ServiceController: ServiceController,
	EventController: EventController,
}
