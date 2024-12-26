import { Modal } from '@components/modal/modal'
import { IClient, IContract, IFacility } from '@src/types/serverAPITypes'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import axios from '../../utils/axiosConfig'
import styles from './CreateContract.module.scss'

interface ICreateContractProps {
	client: IClient | null
	facility: IFacility | null
}

export function CreateContract({ client, facility }: ICreateContractProps) {
	const [isModalVisible, setModalVisible] = useState(false)
	const queryClient = useQueryClient()

	async function createSubmitHandler() {
		if (client && facility) {
			const data: Omit<IContract, 'contract_id'> = {
				date: new Date(),
				clientClientId: client?.client_id,
				holderHolderId: facility?.holderHolderId,
				facilityFacilityId: facility?.facility_id,
			}

			const response = await axios.post(`/contracts`, data)
			if (response.status === 200 || response.status === 201) {
				const response2 = await axios.put(`/facilities/${facility.facility_id}`, { status: 'used' })
				if (response2.status === 200 || response2.status === 201) {
					queryClient.invalidateQueries({ queryKey: ['facility', facility.facility_id] })
					setModalVisible(false)
				} else {
					alert('error3')
				}
			} else {
				alert('error2')
			}
		} else {
			alert('error')
		}
	}
	return (
		<div className={styles.createDiv}>
			<button type='button' onClick={() => setModalVisible(true)}>
				rent
			</button>
			{isModalVisible && (
				<Modal onClose={() => setModalVisible(false)}>
					<h2>are you sure you want to rent this facility?</h2>
					<button type='button' className={styles.submitButton} onClick={() => createSubmitHandler()}>
						confirm
					</button>
				</Modal>
			)}
		</div>
	)
}
