const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Holder = sequelize.define('holder', {
	holder_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	phone: { type: DataTypes.DECIMAL, allowNull: false },
	company: { type: DataTypes.STRING, allowNull: false },
})

const User = sequelize.define('user', {
	user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	role: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
})

const Client = sequelize.define('client', {
	client_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	phone: { type: DataTypes.DECIMAL, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false },
})

const Contract = sequelize.define('contract', {
	contract_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	date: { type: DataTypes.DATEONLY, allowNull: false },
})

const Review = sequelize.define('review', {
	review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	comment: { type: DataTypes.STRING, allowNull: false },
	rate: { type: DataTypes.INTEGER, allowNull: false },
})

const Facility = sequelize.define('facility', {
	facility_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	area: { type: DataTypes.INTEGER, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	status: { type: DataTypes.STRING, allowNull: false },
	picture: { type: DataTypes.STRING, allowNull: true },
})

const Service = sequelize.define('service', {
	service_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
})

const Event = sequelize.define('event', {
	event_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	date: { type: DataTypes.DATEONLY, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
	type: { type: DataTypes.STRING, allowNull: false },
})

User.hasOne(Holder)
User.hasOne(Client)

Holder.belongsTo(User, { unique: true })
Client.belongsTo(User, { unique: true })

Client.hasMany(Contract)
Holder.hasMany(Contract)

Contract.belongsTo(Client)
Contract.belongsTo(Holder)
Contract.belongsTo(Facility)

Holder.hasMany(Facility)
Facility.belongsTo(Holder)

Facility.hasMany(Event)
Event.belongsTo(Facility)

Facility.hasMany(Service)
Service.belongsTo(Facility)

Client.hasMany(Review)
Facility.hasMany(Review)

Review.belongsTo(Client)
Review.belongsTo(Facility)

module.exports = {
	Holder,
	User,
	Client,
	Contract,
	Review,
	Facility,
	Service,
	Event,
}
