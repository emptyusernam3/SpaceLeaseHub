import { CreateContract } from '@components/CreateContractForm/CreateContract'
import { FacilityEditForm } from '@components/FacilityEditForm/FacilityEditForm'
import { FacilityServices } from '@components/FacilityServices/FacilityServices'
import { Reviews } from '@components/Reviews/Reviews'
import { useClient } from '@hooks/useClient'
import { useFacility } from '@hooks/useFacility'
import { useHolderFacilities } from '@hooks/useHolderFacilities'
import { Layout } from '@src/layout/layout'
import { useEffect, useState } from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom'
import styles from './detailedFacility.module.scss'

export function DetailedFacility() {
	const { id } = useParams()
	const [isFacilityValid, setFacilityValid] = useState(false)
	const [isFacilityEditable, setFacilityEditable] = useState(false)
	const [isFacilityDataValid, setFacilityDataValid] = useState(false)

	const facility = useFacility(parseInt(id ?? ''))
	const prevPage = sessionStorage.getItem('prevPage') ?? '/'

	const holderId = parseInt(localStorage.getItem('holderId') ?? '')
	const facilities = holderId ? useHolderFacilities(holderId) : { data: [] }

	useEffect(() => {
		setFacilityValid(!facility.isLoading)
		setFacilityDataValid(!!facility.data)
	}, [facility])

	useEffect(() => {
		if (facilities.data?.length && facility.data) {
			facilities.data.forEach(fac => {
				if (fac.facility_id === facility.data?.facility_id) {
					setFacilityEditable(true)
				}
			})
		}
	}, [facility, facilities])

	const [isClient, setIsClient] = useState(false)
	const clientId = parseInt(localStorage.getItem('clientId') ?? '')
	const client = clientId ? useClient(clientId) : { data: null, isLoading: true }
	useEffect(() => {
		setIsClient(!client.isLoading && !!client.data)
	}, [client])

	return (
		<Layout>
			<main className={styles.main}>
				<Link to={prevPage} className={styles.backBtn}>
					<RiArrowGoBackFill size={40} />
				</Link>
				{isFacilityValid ? (
					isFacilityDataValid ? (
						<>
							<div key={facility.data?.facility_id} className={styles.card}>
								<h1>{facility.data?.name}</h1>
								<div className={styles.imgDiv}>
									<img src={`http://localhost:7000/${facility.data?.picture}`} alt='facility img' />
								</div>
								<p>area: {facility.data?.area} m²</p>
								<p>price: {facility.data?.price} $</p>
								<p>status: {facility.data?.status}</p>
								{isFacilityEditable && <FacilityEditForm holderId={holderId} facility={facility.data ?? null} />}
								{isClient && facility.data?.status === 'free' && (
									<CreateContract client={client.data ?? null} facility={facility.data ?? null} />
								)}
							</div>
							{facility.data && (
								<>
									<FacilityServices facilityId={facility.data.facility_id} />
									<Reviews facilityId={facility.data.facility_id} clientId={client.data?.client_id} />
								</>
							)}
						</>
					) : (
						<div className={styles.loading}>
							<h2>Error: there is no facility whith id = {id}</h2>
						</div>
					)
				) : (
					<div className={styles.loading}>
						<h2>Loading...</h2>
					</div>
				)}
			</main>
		</Layout>
	)
}
