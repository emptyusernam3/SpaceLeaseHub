import axios from '@utils/axiosConfig'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailInputField } from '../inputFields/emailInputField'
import { PasswordInputField } from '../inputFields/passwordInputField'
import styles from './AuthForm.module.scss'

interface IResponse {
	email: string
	password: string
	role: string
	user_id: number
	client_id: number
	holder_id: number
}

export function AuthForm() {
	const navigate = useNavigate()

	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const email = formData.get('email')
		const password = formData.get('password')

		try {
			const response = await axios.post<IResponse | null>('/users/auth', {
				email: email,
				password: password,
			})

			localStorage.setItem('role', response.data?.role ?? '')
			localStorage.setItem('userId', response.data?.user_id.toString() ?? '')

			if (response.data?.role === 'holder') {
				const response2 = await axios.get<IResponse | null>(`/holders/userId/${response.data?.user_id}`)

				if (response2.status === 200) {
					localStorage.setItem('holderId', response2.data?.holder_id.toString() ?? '')
					localStorage.setItem('clientId', '')
					navigate('/holder')
				} else {
					alert('error')
				}
			} else {
				const response2 = await axios.get<IResponse | null>(`/clients/userId/${response.data?.user_id}`)

				if (response2.status === 200) {
					localStorage.setItem('holderId', '')
					localStorage.setItem('clientId', response2.data?.client_id.toString() ?? '')
					navigate('/client')
				} else {
					alert('error')
				}
			}
		} catch {
			alert('error, invalid email or password')
		}
	}

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<EmailInputField />
			<PasswordInputField />
			<button type='submit' className={styles.submitButton}>
				Sign in
			</button>
		</form>
	)
}
