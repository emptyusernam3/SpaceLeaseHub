import { NameInputField } from '@components/inputFields/nameInputField'
import { NumberInputField } from '@components/inputFields/NumberInputField'
import { Modal } from '@components/modal/modal'
import { IFacility } from '@src/types/serverAPITypes'
import { useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../utils/axiosConfig'
import styles from './FacilityEditForm.module.scss'

interface IFacilityEditFormProps {
	holderId: number
	facility: IFacility | null
}

export function FacilityEditForm({ holderId, facility }: IFacilityEditFormProps) {
	const [isEditModalVisible, setEditModalVisible] = useState(false)
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	async function updateSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const newData = {
			name: formData.get('name') as string,
			area: formData.get('number-area'),
			price: formData.get('number-price'),
			status: facility?.status,
			holderHolderId: holderId.toString(),
		}

		const response = await axios.put(`/facilities/${facility?.facility_id}`, newData)
		if (response.status === 200 || response.status === 201) {
			queryClient.invalidateQueries({ queryKey: ['facility', facility?.facility_id] })
			setEditModalVisible(false)
		} else {
			alert('error')
		}
	}
	async function deleteSubmitHandler() {
		const response = await axios.delete(`/facilities/${facility?.facility_id}`)
		if (response.status === 200 || response.status === 201) {
			queryClient.invalidateQueries({ queryKey: ['facility', facility?.facility_id] })
			setDeleteModalVisible(false)
			navigate('/holderFacilities')
		} else {
			alert('error')
		}
	}
	return (
		<div className={styles.edtiDiv}>
			<button type='button' onClick={() => setEditModalVisible(true)}>
				edit
			</button>
			<button type='button' onClick={() => setDeleteModalVisible(true)}>
				delete
			</button>
			{isEditModalVisible && (
				<Modal onClose={() => setEditModalVisible(false)}>
					<form className={styles.form} onSubmit={updateSubmitHandler}>
						<h2>editing facility</h2>
						<p>enter facility new name</p>
						<NameInputField defVal={facility?.name} />
						<p>enter facility new area (m²)</p>
						<NumberInputField placeHolder='enter new area' id='area' defVal={facility?.area} />
						<p>enter facility new price ($)</p>
						<NumberInputField placeHolder='enter new price' id='price' defVal={facility?.price} />
						<button type='submit' className={styles.submitButton}>
							update
						</button>
					</form>
				</Modal>
			)}
			{isDeleteModalVisible && (
				<Modal onClose={() => setDeleteModalVisible(false)}>
					<button className={styles.submitButton} onClick={() => deleteSubmitHandler()}>
						submit deletion
					</button>
				</Modal>
			)}
		</div>
	)
}
