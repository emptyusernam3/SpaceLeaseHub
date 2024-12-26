import styles from './inputField.module.scss'

interface IInputProps {
	onChange: () => void
}

export function HolderCheckBox({ onChange }: IInputProps) {
	return (
		<div className={styles.checkboxDiv}>
			<label>
				<input type='checkbox' id='myCheckbox' name='myCheckbox' onChange={onChange} />
				<p>I am a holder</p>
			</label>
		</div>
	)
}
