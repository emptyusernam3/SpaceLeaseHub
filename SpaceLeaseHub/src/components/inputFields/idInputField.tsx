import styles from './inputField.module.scss'

interface IIdInputProps {
	id?: string
}

export function IdInputField({ id }: IIdInputProps) {
	const inputId = id ? `id-${id}` : 'id'
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input
				className={styles.simple}
				type='number'
				id={inputId}
				name={inputId}
				autoComplete='off'
				placeholder='enter id...'
				required
			/>
		</div>
	)
}
