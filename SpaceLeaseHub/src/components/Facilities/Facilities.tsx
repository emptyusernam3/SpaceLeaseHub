import { FacilitiesReport } from '@components/reports/FacilitiesReport'
import { useFacilities } from '@hooks/useFacilities'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Facilities.module.scss'

export function Facilities() {
	const navigate = useNavigate()
	const [isFacilitiesValid, setFacilitiesValid] = useState(false)
	const [isFacilitiesDataValid, setFacilitiesDataValid] = useState(false)

	const facilities = useFacilities()

	useEffect(() => {
		setFacilitiesValid(!facilities.isLoading)
		setFacilitiesDataValid(!!facilities.data?.length)
	}, [facilities])

	function facilityClickHandler(id: number) {
		sessionStorage.setItem('prevPage', '/')
		navigate(`/detailedFacility/${id}`)
	}

	return (
		<div className={styles.facilitiesDiv}>
			{isFacilitiesValid ? (
				isFacilitiesDataValid ? (
					<>
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
						{facilities.data && <FacilitiesReport facilities={facilities.data} />}
					</>
				) : (
					<div className={styles.loading}>
						<h2>Error: there is no facilities</h2>
					</div>
				)
			) : (
				<div className={styles.loading}>
					<h2>Loading...</h2>
				</div>
			)}
		</div>
	)
}
