import styles from './inputField.module.scss'

interface ICompanyInputProps {
	id?: string
	defVal?: string
}

export function CompanyInputField({ id, defVal }: ICompanyInputProps) {
	const inputId = id ? `company-${id}` : 'company'

	let inputProps = {
		type: 'text',
		id: inputId,
		name: inputId,
		autoComplete: 'off',
		placeholder: 'enter your company',
		required: true,
		defaultValue: '',
	}

	if (defVal) {
		inputProps.defaultValue = defVal
	}
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input {...inputProps} />
		</div>
	)
}
