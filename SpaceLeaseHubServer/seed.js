require('dotenv').config()
const sequelize = require('./db')
const { Holder, User, Client, Contract, Review, Facility, Service, Event } = require('./models/models')

const seed = async () => {
	try {
		await sequelize.authenticate()
		console.log('Connection has been established successfully.')
		await sequelize.sync({ force: true })
		console.log('All models were synchronized successfully.')

		const user1 = await User.create({
			role: 'client',
			email: 'janesmith@example.com',
			password: '1111',
		})
		const user2 = await User.create({
			role: 'client',
			email: 'alicejohnson@example.com',
			password: '1111',
		})
		const user3 = await User.create({
			role: 'client',
			email: 'bobrown@example.com',
			password: '1111',
		})
		const user4 = await User.create({
			role: 'client',
			email: 'charliedavis@example.com',
			password: '1111',
		})
		const user5 = await User.create({
			role: 'client',
			email: 'dianawhite@example.com',
			password: '1111',
		})
		const user6 = await User.create({
			role: 'client',
			email: 'JA@example.com',
			password: '1111',
		})
		const user7 = await User.create({
			role: 'client',
			email: 'JB@example.com',
			password: '1111',
		})
		const user8 = await User.create({
			role: 'client',
			email: 'JS@example.com',
			password: '1111',
		})

		const holder1 = await Holder.create({
			name: 'John Average',
			phone: '121134567890',
			company: 'Av Inc.',
			userUserId: user6.user_id,
		})
		const holder2 = await Holder.create({
			name: 'John Big',
			phone: '123456782290',
			company: 'Big Inc.',
			userUserId: user7.user_id,
		})
		const holder3 = await Holder.create({
			name: 'John Small',
			phone: '123456789440',
			company: 'Small Inc.',
			userUserId: user8.user_id,
		})

		const client1 = await Client.create({
			name: 'Jane Smith',
			phone: '987622543210',
			email: 'janesmith@example.com',
			userUserId: user1.user_id,
		})
		const client2 = await Client.create({
			name: 'Alice Johnson',
			phone: '123422567890',
			email: 'alicejohnson@example.com',
			userUserId: user2.user_id,
		})
		const client3 = await Client.create({
			name: 'Bob Brown',
			phone: '234567228901',
			email: 'bobrown@example.com',
			userUserId: user3.user_id,
		})
		const client4 = await Client.create({
			name: 'Charlie Davis',
			phone: '345672289012',
			email: 'charliedavis@example.com',
			userUserId: user4.user_id,
		})
		const client5 = await Client.create({
			name: 'Diana White',
			phone: '456789220123',
			email: 'dianawhite@example.com',
			userUserId: user5.user_id,
		})

		const facility1 = await Facility.create({
			name: 'house bulkina 16a',
			area: 150,
			price: 1500,
			status: 'used',
			picture: '1.jpg',
			holderHolderId: holder1.holder_id,
		})
		const facility2 = await Facility.create({
			name: 'office makarova 60',
			area: 140,
			price: 2000,
			status: 'free',
			picture: '2.jpg',
			holderHolderId: holder1.holder_id,
		})
		const facility3 = await Facility.create({
			name: 'storage kirova 12',
			area: 260,
			price: 1500,
			status: 'free',
			picture: '3.webp',
			holderHolderId: holder2.holder_id,
		})
		const facility4 = await Facility.create({
			name: 'office makarova 12a',
			area: 80,
			price: 1000,
			status: 'used',
			picture: '4.jpg',
			holderHolderId: holder2.holder_id,
		})
		const facility5 = await Facility.create({
			name: 'storage bulkina 8',
			area: 150,
			price: 1200,
			status: 'used',
			picture: '5.jpg',
			holderHolderId: holder3.holder_id,
		})
		const facility6 = await Facility.create({
			name: 'kitchen bulkina 144b',
			area: 120,
			price: 6000,
			status: 'free',
			picture: '6.jpg',
			holderHolderId: holder3.holder_id,
		})

		const service1 = await Service.create({
			name: 'Cleaning',
			price: 100,
			description: 'Daily office cleaning service.',
			facilityFacilityId: facility1.facility_id,
		})
		const service2 = await Service.create({
			name: 'IT Support',
			price: 120,
			description: 'Technical support and maintenance for IT systems',
			facilityFacilityId: facility2.facility_id,
		})
		const service3 = await Service.create({
			name: 'Security',
			price: 100,
			description: 'Security services',
			facilityFacilityId: facility3.facility_id,
		})
		const service4 = await Service.create({
			name: 'Waste Management',
			price: 60,
			description: 'Professional waste management services',
			facilityFacilityId: facility4.facility_id,
		})
		const service5 = await Service.create({
			name: 'IT Support',
			price: 120,
			description: 'Technical support and maintenance for IT systems',
			facilityFacilityId: facility5.facility_id,
		})
		const service6 = await Service.create({
			name: 'Security',
			price: 100,
			description: 'Security services',
			facilityFacilityId: facility4.facility_id,
		})
		const service7 = await Service.create({
			name: 'Cleaning',
			price: 50,
			description: 'Professional cleaning service',
			facilityFacilityId: facility5.facility_id,
		})
		const service8 = await Service.create({
			name: 'Waste Management',
			price: 60,
			description: 'Professional waste management services',
			facilityFacilityId: facility6.facility_id,
		})

		const event1 = await Event.create({
			name: 'Art Exhibition',
			date: '2024-12-22',
			description: 'Modern art exhibition featuring talented artists',
			type: 'Art',
			facilityFacilityId: facility1.facility_id,
		})
		const event2 = await Event.create({
			name: 'Conference',
			date: '2024-12-22',
			description: 'Conference featuring experts in various fields',
			type: 'Business Event',
			facilityFacilityId: facility2.facility_id,
		})
		const event3 = await Event.create({
			name: 'Theatrical Performance',
			date: '2024-12-22',
			description: 'Drama play performed by professional actors',
			type: 'Theatre',
			facilityFacilityId: facility3.facility_id,
		})
		const event4 = await Event.create({
			name: 'Theatrical Performance',
			date: '2024-12-26',
			description: 'Drama play performed by professional actors',
			type: 'Theatre',
			facilityFacilityId: facility4.facility_id,
		})

		const contract1 = await Contract.create({
			date: '2024-01-01',
			clientClientId: client1.client_id,
			holderHolderId: holder1.holder_id,
			facilityFacilityId: facility1.facility_id,
		})
		const contract2 = await Contract.create({
			date: '2024-01-01',
			clientClientId: client2.client_id,
			holderHolderId: holder2.holder_id,
			facilityFacilityId: facility4.facility_id,
		})
		const contract3 = await Contract.create({
			date: '2024-01-01',
			clientClientId: client3.client_id,
			holderHolderId: holder3.holder_id,
			facilityFacilityId: facility5.facility_id,
		})

		const review1 = await Review.create({
			comment: 'good',
			rate: 4,
			clientClientId: client3.client_id,
			facilityFacilityId: facility1.facility_id,
		})
		const review2 = await Review.create({
			comment: 'mid',
			rate: 5,
			clientClientId: client3.client_id,
			facilityFacilityId: facility3.facility_id,
		})
		const review3 = await Review.create({
			comment: 'good',
			rate: 1,
			clientClientId: client1.client_id1,
			facilityFacilityId: facility3.facility_id,
		})
		const review4 = await Review.create({
			comment: 'good',
			rate: 3,
			clientClientId: client2.client_id,
			facilityFacilityId: facility4.facility_id,
		})
		const review5 = await Review.create({
			comment: 'perfect',
			rate: 5,
			clientClientId: client3.client_id,
			facilityFacilityId: facility4.facility_id,
		})
		const review6 = await Review.create({
			comment: 'good',
			rate: 4,
			clientClientId: client4.client_id,
			facilityFacilityId: facility5.facility_id,
		})
		const review7 = await Review.create({
			comment: 'good',
			rate: 4,
			clientClientId: client5.client_id2,
			facilityFacilityId: facility6.facility_id,
		})

		console.log('Database seeded successfully!')
	} catch (error) {
		console.error('Error seeding database:', error)
	} finally {
		await sequelize.close()
	}
}
seed()
