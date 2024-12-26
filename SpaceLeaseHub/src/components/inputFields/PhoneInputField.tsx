import styles from './inputField.module.scss'

interface IPhoneInputProps {
	defVal?: number
}

export function PhoneInputField({ defVal }: IPhoneInputProps) {
	let inputProps = {
		type: 'number',
		id: 'phone',
		name: 'phone',
		placeholder: 'enter your phone',
		autoComplete: 'on',
		required: true,
		defaultValue: '',
	}

	if (defVal) {
		inputProps.defaultValue = defVal.toString()
	}
	return (
		<div className={styles.inputDiv}>
			<label htmlFor='phone'></label>
			<input {...inputProps} />
		</div>
	)
}
