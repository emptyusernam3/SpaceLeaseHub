import styles from './inputField.module.scss'

export function PictureInputField() {
	const inputId = 'picture'

	let inputProps = {
		className: styles.img,
		type: 'file',
		id: inputId,
		name: inputId,
		required: true,
	}
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input {...inputProps} />
		</div>
	)
}
