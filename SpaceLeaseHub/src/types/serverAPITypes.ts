interface IClient {
	name: string
	email: string
	phone: number
	client_id: number
	userUserId: number
}
interface IHolder {
	name: string
	phone: number
	company: string
	holder_id: number
	userUserId: number
}
interface IFacility {
	name: string
	area: number
	price: number
	status: string
	picture: string
	facility_id: number
	holderHolderId: number
}
interface IContract {
	date: Date | string
	contract_id: number
	holderHolderId: number
	facilityFacilityId: number
	clientClientId: number
}
interface IReview {
	review_id: number
	comment: string
	rate: number
	facilityFacilityId: number
	clientClientId: number
}
interface IEvent {
	name: string
	date: Date | string
	description: string
	event_id: number
	type: string
	facilityFacilityId: number
}
interface IService {
	name: string
	price: number
	description: string
	service_id: number
	facilityFacilityId: number
}

export type { IClient, IContract, IEvent, IFacility, IHolder, IReview, IService }
