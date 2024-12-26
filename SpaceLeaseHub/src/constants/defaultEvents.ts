import { IEvent } from '@src/types/serverAPITypes'

export const defaultEventsData: Omit<IEvent, 'date' | 'event_id' | 'facilityFacilityId'>[] = [
	{
		name: 'Concert',
		description: 'Exciting concert featuring well-known artists',
		type: 'Music Event',
	},
	{
		name: 'Art Exhibition',
		description: 'Modern art exhibition featuring talented artists',
		type: 'Art',
	},
	{
		name: 'Theatrical Performance',
		description: 'Drama play performed by professional actors',
		type: 'Theatre',
	},
	{
		name: 'Conference',
		description: 'Conference featuring experts in various fields',
		type: 'Business Event',
	},
]
