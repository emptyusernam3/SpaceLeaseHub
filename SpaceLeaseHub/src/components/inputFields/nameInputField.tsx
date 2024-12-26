import styles from './inputField.module.scss'

interface INameInputProps {
	id?: string
	defVal?: string
}

export function NameInputField({ id, defVal }: INameInputProps) {
	const inputId = id ? `name-${id}` : 'name'
	let inputProps = {
		className: '',
		type: 'text',
		id: inputId,
		name: inputId,
		placeholder: 'enter your name',
		autoComplete: 'off',
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
