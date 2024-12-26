import { IdInputField } from '@components/inputFields/idInputField'
import { Modal } from '@components/modal/modal'
import { useHolder } from '@hooks/useHolder'
import { useHolderFacilities } from '@hooks/useHolderFacilities'
import { defaultServicesData } from '@src/constants/defaultServices'
import { Layout } from '@src/layout/layout'
import { IService } from '@src/types/serverAPITypes'
import { FormEvent, useEffect, useState } from 'react'
import { FaHandHoldingDollar } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import axios from '../../utils/axiosConfig'
import styles from './services.module.scss'

export function Services() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [isHolder, setIsHolder] = useState(true)
	const [isDataValid, setDataValid] = useState(false)
	const [isModalOpen, setModalOpen] = useState(false)
	const [addService, setAddService] = useState<Omit<IService, 'service_id' | 'facilityFacilityId'> | null>(null)

	const holderId = parseInt(localStorage.getItem('holderId') ?? '')
	const holder = useHolder(holderId)
	const facilities = useHolderFacilities(holderId)

	useEffect(() => {
		setIsLoading(!holder.isLoading && !facilities.isLoading)
		setIsHolder(
			!isLoading || (!!localStorage.getItem('holderId') && localStorage.getItem('role') === 'holder' && !!holder.data)
		)
		setDataValid(!!facilities.data?.length)
	}, [holder, facilities])

	async function addServiceHandler(service: Omit<IService, 'service_id' | 'facilityFacilityId'>) {
		if (!isDataValid) {
			alert('error, you havent got any facilities. add facilities first')
			return
		}
		setModalOpen(true)
		setAddService(service)
	}

	async function addSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const id = parseInt(formData.get('id') as string, 10)

		let isFacilityIdExist = false
		facilities.data?.forEach(facility => {
			if (facility.facility_id === id) {
				isFacilityIdExist = true
			}
		})
		if (!isFacilityIdExist) {
			alert('error: thats not your facility')
			return
		}

		const response = await axios.post(`/services`, {
			name: addService?.name,
			description: addService?.description,
			price: addService?.price,
			facilityFacilityId: id,
		})

		if (response.status === 200) {
			setModalOpen(false)
			navigate(`/detailedFacility/${id}`)
		}
	}

	return (
		<Layout>
			<main className={styles.main}>
				{isHolder ? (
					<>
						<h1>services</h1>
						<div className={styles.defServices}>
							<h2>default services</h2>
							{defaultServicesData.map(service => {
								return (
									<div className={styles.service} key={service.name + service.price}>
										<h3>{service.name}</h3>
										<p>{service.description}</p>
										<p>{service.price} $</p>
										<button type='button' className={styles.buyButton} onClick={() => addServiceHandler(service)}>
											<FaHandHoldingDollar size={25} />
										</button>
									</div>
								)
							})}
						</div>
					</>
				) : (
					<div>
						<h1>Error</h1>
						<h2>Sorry, it looks like you are not a holder</h2>
						<p>try register as holder to get access to this page</p>
					</div>
				)}
				{isModalOpen && (
					<Modal onClose={() => setModalOpen(false)}>
						<div className={styles.yourFacilities}>
							<ul>
								<li>facility name</li>
								<li>facility id</li>
							</ul>
							{facilities.data?.map(facility => {
								return (
									<ul key={facility.facility_id}>
										<li>{facility.name}</li>
										<li>{facility.facility_id}</li>
									</ul>
								)
							})}
						</div>
						<form className={styles.form} onSubmit={addSubmitHandler}>
							<p>enter id of your faciity</p>
							<IdInputField />
							<button type='submit' className={styles.submitButton}>
								add service
							</button>
						</form>
					</Modal>
				)}
			</main>
		</Layout>
	)
}
