import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthForm } from '../../components/AuthForm/AuthForm'
import { ChangePassword } from '../../components/changePassword/changePassword'
import styles from './auth.module.scss'

export function Auth() {
	const [isModalVisible, setModalVisible] = useState(false)
	return (
		<main className={`${styles.main}`}>
			{isModalVisible && <ChangePassword setModalVisible={setModalVisible} />}
			<div className={styles.formContainer}>
				<h2>Log in</h2>
				<hr />
				<AuthForm />
				<hr />
				<div className={styles.regDiv}>
					<p>Forget your password?</p>
					<button type='button' className={styles.changePasswordButton} onClick={() => setModalVisible(true)}>
						change password
					</button>
				</div>
				<div className={styles.regDiv}>
					<p>Don't have an account?</p>
					<Link to='/registration'>sign up</Link>
				</div>
			</div>
		</main>
	)
}
