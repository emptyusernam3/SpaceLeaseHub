import { Dispatch, ReactNode, SetStateAction } from 'react'
import { IoClose } from 'react-icons/io5'
import styles from './modal.module.scss'

interface IModalProps {
	onClose: Dispatch<SetStateAction<boolean>>
	children?: ReactNode
}

export function Modal({ onClose, children }: IModalProps) {
	return (
		<div className={`${styles.modal}`}>
			<div className={styles.modalWrapper}>
				<div className={styles.modalContent}>
					<button className={styles.modalClose} onClick={() => onClose(false)}>
						<IoClose size={20} color='white' />
					</button>
					{children}
				</div>
			</div>
			<div className={styles.modalBg} onClick={() => onClose(false)}></div>
		</div>
	)
}
