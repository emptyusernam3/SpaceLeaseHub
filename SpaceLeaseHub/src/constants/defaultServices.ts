import { IService } from '@src/types/serverAPITypes'

export const defaultServicesData: Omit<IService, 'service_id' | 'facilityFacilityId'>[] = [
	{
		name: 'Room Cleaning',
		description: 'Professional cleaning service',
		price: 50,
	},
	{
		name: 'Security',
		description: 'Security services',
		price: 100,
	},
	{
		name: 'Interior Design',
		description: 'Custom interior design services',
		price: 150,
	},
	{
		name: 'IT Support',
		description: 'Technical support and maintenance for IT systems',
		price: 120,
	},
	{
		name: 'Waste Management',
		description: 'Professional waste management services',
		price: 60,
	},
]
