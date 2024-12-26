import { CompanyInputField } from '@components/inputFields/CompanyInputField'
import { NameInputField } from '@components/inputFields/nameInputField'
import { PhoneInputField } from '@components/inputFields/PhoneInputField'
import { IHolder } from '@src/types/serverAPITypes'
import { useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import axios from '../../utils/axiosConfig'
import { Modal } from '../modal/modal'
import styles from './HolderEditForm.module.scss'

interface IHolderEditFormProps {
	holder?: IHolder
}

export function HolderEditForm({ holder }: IHolderEditFormProps) {
	const [isModalOpen, setModalOpen] = useState(false)
	const queryClient = useQueryClient()

	async function updateSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const name = formData.get('name')
		const company = formData.get('company')
		const phone = parseInt(formData.get('phone') as string, 10)

		const response = await axios.put(`/holders/${holder?.holder_id}`, {
			name: name,
			phone: phone,
			company: company,
			userUserId: holder?.userUserId,
		})

		if (response.status === 200) {
			queryClient.invalidateQueries({ queryKey: ['holder', holder?.holder_id] })
			setModalOpen(false)
		}
	}
	return (
		<div>
			{isModalOpen && (
				<Modal onClose={() => setModalOpen(false)}>
					<form className={styles.form} onSubmit={updateSubmitHandler}>
						<p>enter new name</p>
						<NameInputField defVal={holder?.name} />
						<p>enter new phone</p>
						<PhoneInputField defVal={holder?.phone} />
						<p>enter new company</p>
						<CompanyInputField defVal={holder?.company} />
						<button type='submit' className={styles.submitButton}>
							update
						</button>
					</form>
				</Modal>
			)}

			<button type='button' className={styles.submitButton} onClick={() => setModalOpen(true)}>
				edit data
			</button>
		</div>
	)
}
