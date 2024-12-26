import { NameInputField } from '@components/inputFields/nameInputField'
import { PhoneInputField } from '@components/inputFields/PhoneInputField'
import { IClient } from '@src/types/serverAPITypes'
import { useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import axios from '../../utils/axiosConfig'
import { Modal } from '../modal/modal'
import styles from './clientEditForm.module.scss'

interface IClientEditFormProps {
	client?: IClient
}

export function ClientEditForm({ client }: IClientEditFormProps) {
	const [isModalOpen, setModalOpen] = useState(false)
	const queryClient = useQueryClient()

	async function updateSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const name = formData.get('name')
		const phone = parseInt(formData.get('phone') as string, 10)

		const response = await axios.put(`/clients/${client?.client_id}`, {
			email: client?.email,
			name: name,
			phone: phone,
			userUserId: client?.userUserId,
		})

		if (response.status === 200) {
			queryClient.invalidateQueries({ queryKey: ['client', client?.client_id] })
			setModalOpen(false)
		}
	}
	return (
		<div>
			{isModalOpen && (
				<Modal onClose={() => setModalOpen(false)}>
					<form className={styles.form} onSubmit={updateSubmitHandler}>
						<p>enter new name</p>
						<NameInputField defVal={client?.name} />
						<p>enter new phone</p>
						<PhoneInputField defVal={client?.phone} />
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
