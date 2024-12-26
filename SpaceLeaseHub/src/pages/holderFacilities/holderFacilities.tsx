import { FacilityAddForm } from '@components/FacilityAddForm/FacilityAddForm'
import { Modal } from '@components/modal/modal'
import { useHolder } from '@hooks/useHolder'
import { useHolderFacilities } from '@hooks/useHolderFacilities'
import { Layout } from '@src/layout/layout'
import { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import styles from './holderFacilities.module.scss'

export function HolderFacilities() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [isHolder, setIsHolder] = useState(true)
	const [isDataValid, setDataValid] = useState(false)
	const [isModalVisible, setModalVisible] = useState(false)

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

	function facilityClickHandler(id: number) {
		sessionStorage.setItem('prevPage', '/holderFacilities')
		navigate(`/detailedFacility/${id}`)
	}

	return (
		<Layout>
			<main className={styles.main}>
				{isHolder ? (
					isLoading ? (
						<div className={styles.infoDiv}>
							<div className={styles.infoHeader}>
								<h2>Hello, {holder.data?.name}</h2>
								<p>take a look at your facilities</p>
							</div>
							{isDataValid ? (
								<div className={styles.info}>
									{facilities.data?.map(facility => {
										return (
											<div
												key={facility.facility_id}
												className={styles.card}
												onClick={() => facilityClickHandler(facility.facility_id)}
											>
												<h3>{facility.name}</h3>
												<img src={`http://localhost:7000/${facility.picture}`} alt='facility img' />
												<p>area: {facility.area} m²</p>
												<p>price: {facility.price} $</p>
												<p>status: {facility.status}</p>
											</div>
										)
									})}
								</div>
							) : (
								<div className={styles.info}>
									<h2>Sorry, it looks like you haven't got any facilities yet</h2>
									<p>try add some facilities</p>
								</div>
							)}
							<div className={styles.add}>
								<button type='button' onClick={() => setModalVisible(true)}>
									<h3>add facility</h3>
									<IoMdAdd />
								</button>
							</div>
						</div>
					) : (
						<div>
							<h1>Loading...</h1>
						</div>
					)
				) : (
					<div>
						<h1>Error</h1>
						<h2>Sorry, it looks like you are not a holder</h2>
						<p>try register as holder to get access to this page</p>
					</div>
				)}
				{isModalVisible && (
					<Modal onClose={() => setModalVisible(false)}>
						<FacilityAddForm holderId={holderId} onComplete={() => setModalVisible(false)} />
					</Modal>
				)}
			</main>
		</Layout>
	)
}
