import styles from './inputField.module.scss'

interface INumberInputProps {
	defVal?: number
	id?: string
	placeHolder: string
}

export function NumberInputField({ defVal, id, placeHolder }: INumberInputProps) {
	const inputId = id ? `number-${id}` : 'number'
	let inputProps = {
		type: 'number',
		id: inputId,
		name: inputId,
		placeholder: placeHolder,
		autoComplete: 'on',
		required: true,
		defaultValue: '',
	}

	if (defVal) {
		inputProps.defaultValue = defVal.toString()
	}

	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input {...inputProps} />
		</div>
	)
}
