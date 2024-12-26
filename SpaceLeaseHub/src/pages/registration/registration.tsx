import { Link } from 'react-router-dom'
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm'
import styles from './registration.module.scss'

export function Registration() {
	return (
		<main className={`${styles.main}`}>
			<div className={styles.formContainer}>
				<h2>Sign up</h2>
				<hr />
				<RegistrationForm />
				<hr />
				<div className={styles.authDiv}>
					<p>already have an account?</p>
					<Link to='/auth'>log in</Link>
				</div>
			</div>
		</main>
	)
}
