import { IdInputField } from '@components/inputFields/idInputField'
import { Modal } from '@components/modal/modal'
import { useClient } from '@hooks/useClient'
import { useClientContracts } from '@hooks/useClientContracts'
import { defaultEventsData } from '@src/constants/defaultEvents'
import { Layout } from '@src/layout/layout'
import { IContract, IEvent } from '@src/types/serverAPITypes'
import axios from '@utils/axiosConfig'
import { FormEvent, useEffect, useState } from 'react'
import { MdAddBusiness } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import styles from './events.module.scss'

export function Events() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [isClient, setIsClient] = useState(true)
	const [isDataValid, setDataValid] = useState(false)
	const [isModalOpen, setModalOpen] = useState(false)
	const [addEvent, setAddEvent] = useState<Omit<IEvent, 'event_id' | 'facilityFacilityId' | 'date'> | null>(null)

	const clientId = parseInt(localStorage.getItem('clientId') ?? '')
	const client = useClient(clientId)
	const contracts = useClientContracts(clientId)

	useEffect(() => {
		setIsLoading(!client.isLoading && !contracts.isLoading)
		setIsClient(
			!isLoading || (!!localStorage.getItem('clientId') && localStorage.getItem('role') === 'client' && !!client.data)
		)
		setDataValid(!!contracts.data?.length)
	}, [client, contracts])

	async function addEventHandler(event: Omit<IEvent, 'event_id' | 'facilityFacilityId' | 'date'>) {
		if (!isDataValid) {
			alert('error, you havent got any facilities. add facilities first')
			return
		}
		setModalOpen(true)
		setAddEvent(event)
	}

	async function addSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const id = parseInt(formData.get('id') as string, 10)

		let isFacilityIdExist = false
		contracts.data?.forEach(contract => {
			if (contract.facilityFacilityId === id) {
				isFacilityIdExist = true
			}
		})
		if (!isFacilityIdExist) {
			alert('error: you cant order an event on not yours facility')
			return
		}

		const data: Omit<IEvent, 'event_id'> = {
			name: addEvent?.name as string,
			date: new Date(),
			description: addEvent?.description as string,
			type: addEvent?.type as string,
			facilityFacilityId: id,
		}

		try {
			const response = await axios.post(`/events`, data)

			if (response.status === 200) {
				setModalOpen(false)
				navigate(`/detailedFacility/${id}`)
			}
		} catch (e) {
			console.log(e)
		}
	}

	function linkClickHandler(contract: IContract) {
		sessionStorage.setItem('prevPage', '/events')
		navigate(`/detailedFacility/${contract.facilityFacilityId}`)
	}

	return (
		<Layout>
			<main className={styles.main}>
				{isClient ? (
					<>
						<h1>events</h1>
						<div className={styles.defEvents}>
							<h2>default events</h2>
							{defaultEventsData.map(event => {
								return (
									<div className={styles.event} key={event.name + event.type}>
										<h3>{event.name}</h3>
										<p>{event.description}</p>
										<p>{event.type}</p>
										<button type='button' className={styles.buyButton} onClick={() => addEventHandler(event)}>
											<MdAddBusiness size={25} />
										</button>
									</div>
								)
							})}
						</div>
					</>
				) : (
					<div>
						<h1>Error</h1>
						<h2>Sorry, it looks like you are not a client</h2>
						<p>try register as client to get access to this page</p>
					</div>
				)}
				{isModalOpen && (
					<Modal onClose={() => setModalOpen(false)}>
						<div className={styles.yourFacilities}>
							<h3>you can see page of facility by pressing on id</h3>
							<ul>
								<li>facility id</li>
							</ul>
							{contracts.data?.map(contract => {
								return (
									<ul key={contract.facilityFacilityId}>
										<li onClick={() => linkClickHandler(contract)}>{contract.facilityFacilityId}</li>
									</ul>
								)
							})}
						</div>
						<form className={styles.form} onSubmit={addSubmitHandler}>
							<p>enter id of your faciity</p>
							<IdInputField />
							<button type='submit' className={styles.submitButton}>
								add event
							</button>
						</form>
					</Modal>
				)}
			</main>
		</Layout>
	)
}
