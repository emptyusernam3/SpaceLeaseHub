import { Modal } from '@components/modal/modal'
import { useState } from 'react'
import { FaGithub, FaPhoneAlt } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import styles from './footer.module.scss'

export function Footer() {
	const [isModalOpen, setModalOpen] = useState(false)

	return (
		<footer className={styles.footer}>
			<div className={styles.contacts}>
				<a href='tel:+123456789'>
					<div>
						<FaPhoneAlt size={30} />
					</div>
				</a>
				<a href='mailto:example@example.com'>
					<div>
						<IoMdMail size={30} />
					</div>
				</a>
				<a href='https://github.com'>
					<div>
						<FaGithub size={30} />
					</div>
				</a>
				<button type='button' className={styles.locationBtn} onClick={() => setModalOpen(true)}>
					<div>
						<IoLocationSharp size={30} />
					</div>
				</button>
			</div>
			<div className={styles.logoDiv}>
				<Link to='/'>
					<h3>SpaceLeaseHub, 2024</h3>
				</Link>
			</div>
			{isModalOpen && (
				<Modal onClose={() => setModalOpen(false)}>
					<iframe
						className={styles.map}
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18820.36760480227!2d30.28684973716737!3d53.86872144528907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d051781f279227%3A0x495d6986b9f4a589!2z0JPQsNGA0LDQttC90YvQuSDQvNCw0YHRgdC40LIg0L3QsCDRg9C7LtCh0LjQvNC-0L3QvtCy0LAsINGD0LsuINCh0LjQvNC-0L3QvtCy0LAsINCc0L7Qs9C40LvRkdCyLCDQnNC-0LPQuNC70ZHQstGB0LrQsNGPINC-0LHQu9Cw0YHRgtGM!5e0!3m2!1sru!2sby!4v1734678745791!5m2!1sru!2sby'
						loading='lazy'
					></iframe>
				</Modal>
			)}
		</footer>
	)
}
