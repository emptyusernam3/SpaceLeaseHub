import { EventsTable } from '@components/EventsTable/EventsTable'
import { Modal } from '@components/modal/modal'
import { ServicesTable } from '@components/ServicesTable/ServicesTable'
import { useEvents } from '@hooks/useEvents'
import { useFacilityServices } from '@hooks/useFacilityServices'
import { useEffect, useState } from 'react'
import styles from './FacilityServices.module.scss'

interface IFacilityServicesProps {
	facilityId: number
}

export function FacilityServices({ facilityId }: IFacilityServicesProps) {
	const [isEventsModalOpen, setEventsModalOpen] = useState(false)
	const [isServicesModalOpen, setServicesModalOpen] = useState(false)
	const [isServicesValid, setServicesValid] = useState(false)
	const [isEventsValid, setEventsValid] = useState(false)

	const services = useFacilityServices(facilityId)
	const events = useEvents(facilityId)

	useEffect(() => {
		setServicesValid(!services.isLoading && !!services.data?.length)
	}, [services])

	useEffect(() => {
		setEventsValid(!events.isLoading && !!events.data?.length)
	}, [events])

	if (isEventsValid || isServicesValid) {
		return (
			<div className={styles.facilityServices}>
				{isServicesValid && (
					<button type='button' onClick={() => setServicesModalOpen(true)}>
						show services
					</button>
				)}
				{isEventsValid && (
					<button type='button' onClick={() => setEventsModalOpen(true)}>
						show events
					</button>
				)}

				{isServicesModalOpen && (
					<Modal onClose={() => setServicesModalOpen(false)}>
						{services.data && <ServicesTable services={services.data} />}
					</Modal>
				)}
				{isEventsModalOpen && (
					<Modal onClose={() => setEventsModalOpen(false)}>{events.data && <EventsTable events={events.data} />}</Modal>
				)}
			</div>
		)
	}
}
