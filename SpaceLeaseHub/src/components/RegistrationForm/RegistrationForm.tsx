import axios from '@utils/axiosConfig'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CompanyInputField } from '../inputFields/CompanyInputField'
import { EmailInputField } from '../inputFields/emailInputField'
import { HolderCheckBox } from '../inputFields/HolderCheckBox'
import { NameInputField } from '../inputFields/nameInputField'
import { PasswordInputField } from '../inputFields/passwordInputField'
import { PhoneInputField } from '../inputFields/PhoneInputField'
import styles from './RegistrationForm.module.scss'

interface IResponse {
	email: string
	password: string
	role: string
	user_id: number
	client_id: number
	holder_id: number
}

export function RegistrationForm() {
	const navigate = useNavigate()
	const [isHolder, setIsHolder] = useState(false)
	async function submitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const name = formData.get('name')
		const email = formData.get('email')
		const phone = formData.get('phone')
		const password = formData.get('password')
		const company = formData.get('company')

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!emailRegex.test(email as string)) {
			alert('error: email incorrect')
			return
		}
		if (phone?.toString().length !== 12) {
			alert('error: phone incorrect')
			return
		}

		const role = company ? 'holder' : 'client'

		const reqest1data = {
			email: email,
			role: role,
			password: password,
		}

		const response = await axios.post<IResponse | null>('/users', {
			...reqest1data,
		})
		if (response.status === 200) {
			const userId = response.data?.user_id

			if (!!company) {
				const response2 = await axios.post<IResponse | null>('/holders', {
					name: name,
					phone: phone,
					company: company,
					userUserId: userId,
				})
				if (response2.status === 200) {
					const response3 = await axios.post<IResponse | null>('/users/auth', {
						email: email,
						password: password,
					})
					if (response3.status === 200) {
						localStorage.setItem('role', response3.data?.role ?? '')
						localStorage.setItem('userId', response3.data?.user_id.toString() ?? '')
						localStorage.setItem('holderId', response2.data?.holder_id.toString() ?? '')
						localStorage.setItem('clientId', '')
						navigate('/holder')
					} else {
						alert('error')
					}
				}
			} else {
				const response2 = await axios.post<IResponse | null>('/clients', {
					name: name,
					phone: phone,
					email: email,
					userUserId: userId,
				})
				if (response2.status === 200) {
					const response3 = await axios.post<IResponse | null>('/users/auth', {
						email: email,
						password: password,
					})
					if (response3.status === 200) {
						localStorage.setItem('role', response3.data?.role ?? '')
						localStorage.setItem('userId', response3.data?.user_id.toString() ?? '')
						localStorage.setItem('holderId', '')
						localStorage.setItem('clientId', response2.data?.client_id.toString() ?? '')
						navigate('/client')
					} else {
						alert('error')
					}
				}
			}
		} else {
			alert('error, this email already used')
		}
	}

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<NameInputField />
			<EmailInputField />
			<PhoneInputField />
			<PasswordInputField />
			{isHolder ? <CompanyInputField /> : <div className={styles.placeHolder}></div>}
			<HolderCheckBox onChange={() => setIsHolder(!isHolder)} />
			<button type='submit' className={styles.submitButton}>
				register
			</button>
		</form>
	)
}
