import { NameInputField } from '@components/inputFields/nameInputField'
import { NumberInputField } from '@components/inputFields/NumberInputField'
import { PictureInputField } from '@components/inputFields/PictureInputField'
import { useQueryClient } from '@tanstack/react-query'
import { FormEvent } from 'react'
import axios from '../../utils/axiosConfig'
import styles from './FacilityAddForm.module.scss'

interface IFacilityAddFormProps {
	holderId: number
	onComplete: () => void
}

export function FacilityAddForm({ holderId, onComplete }: IFacilityAddFormProps) {
	const queryClient = useQueryClient()

	async function updateSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const combinedFormData = new FormData()
		combinedFormData.append('picture', formData.get('picture') as File)
		combinedFormData.append('name', formData.get('name') as string)
		combinedFormData.append('area', formData.get('number-area') as string)
		combinedFormData.append('price', formData.get('number-price') as string)
		combinedFormData.append('status', 'free')
		combinedFormData.append('holderHolderId', holderId.toString())

		const response = await axios.post('/facilities', combinedFormData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		if (response.status === 200 || response.status === 201) {
			onComplete()
			queryClient.invalidateQueries({ queryKey: ['facilities', holderId] })
		}
	}
	return (
		<form className={styles.form} onSubmit={updateSubmitHandler} encType='multipart/form-data'>
			<h2>adding new facility</h2>
			<p>enter facility name</p>
			<NameInputField />
			<p>enter facility area (m²)</p>
			<NumberInputField placeHolder='enter your area' id='area' />
			<p>enter facility price ($)</p>
			<NumberInputField placeHolder='enter your price' id='price' />
			<p>chose facility picture</p>
			<PictureInputField />
			<button type='submit' className={styles.submitButton}>
				create
			</button>
		</form>
	)
}
