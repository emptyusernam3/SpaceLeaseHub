import { ClientEditForm } from '@components/ClientEditForm/ClientEditForm'
import { useClient } from '@hooks/useClient'
import { Layout } from '@layout/layout'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './client.module.scss'

export function Client() {
	const navigate = useNavigate()
	const [isClient, setIsClient] = useState(true)
	const [isDataValid, setDataValid] = useState(false)

	const client = useClient(parseInt(localStorage.getItem('clientId') ?? ''))

	useEffect(() => {
		setIsClient(!!localStorage.getItem('clientId') && localStorage.getItem('role') === 'client')
		setDataValid(!client.isLoading && !!client.data)
	}, [client])

	function logOut() {
		setIsClient(false)

		localStorage.removeItem('role')
		localStorage.removeItem('userId')
		localStorage.removeItem('clientId')
		localStorage.removeItem('holderId')
		navigate('/')
	}

	return (
		<Layout>
			<main className={styles.main}>
				{isClient ? (
					isDataValid ? (
						<div className={styles.infoDiv}>
							<div className={styles.infoHeader}>
								<h2>Welcome, {client.data?.name}</h2>
								<p>your email: {client.data?.email}</p>
								<p>your phone: +{client.data?.phone}</p>
								<p>your id: {client.data?.client_id}</p>
							</div>
							<hr />
							<ClientEditForm client={client.data} />
							<hr />
							<button onClick={() => logOut()}>log out</button>
						</div>
					) : (
						<div className={styles.loadingDiv}>
							<h1>Loading...</h1>
						</div>
					)
				) : (
					<div>
						<h1>Error</h1>
						<h2>Sorry, it looks like you are not a client</h2>
						<p>try register as client to get access to this page</p>
					</div>
				)}
			</main>
		</Layout>
	)
}
