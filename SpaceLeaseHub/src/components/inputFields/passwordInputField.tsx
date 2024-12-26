import { useRef, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import styles from './inputField.module.scss'

interface IPasswordInputProps {
	id?: string
}

export function PasswordInputField({ id }: IPasswordInputProps) {
	const inputId = id ? `password${id}` : 'password'
	const currentRef = useRef<HTMLInputElement>(null)
	const [isPasswordVisible, setPasswordVisibility] = useState(false)

	const passwordVisibilityHandler = () => {
		if (currentRef.current) {
			currentRef.current.type = isPasswordVisible ? 'password' : 'text'
			setPasswordVisibility(prev => !prev)
		}
	}

	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input
				ref={currentRef}
				type={isPasswordVisible ? 'text' : 'password'}
				className={styles.passwordInput}
				id={inputId}
				name={inputId}
				placeholder='enter your password'
				autoComplete='on'
				required
			/>
			<button type='button' className={`${styles.iconDiv} ${styles.passwordDiv}`} onClick={passwordVisibilityHandler}>
				<FaEye size={20} />
			</button>
		</div>
	)
}
