import { HolderEditForm } from '@components/HolderEditForm/HolderEditForm'
import { useHolder } from '@hooks/useHolder'
import { Layout } from '@layout/layout'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './holder.module.scss'

export function Holder() {
	const navigate = useNavigate()
	const [isHolder, setIsHolder] = useState(true)
	const [isDataValid, setDataValid] = useState(false)

	const holder = useHolder(parseInt(localStorage.getItem('holderId') ?? ''))

	useEffect(() => {
		setIsHolder(!!localStorage.getItem('holderId') && localStorage.getItem('role') === 'holder')
		setDataValid(!holder.isLoading && !!holder.data)
	}, [holder])

	function logOut() {
		setIsHolder(false)

		localStorage.removeItem('role')
		localStorage.removeItem('userId')
		localStorage.removeItem('clientId')
		localStorage.removeItem('holderId')
		navigate('/')
	}

	return (
		<Layout>
			<main className={styles.main}>
				{isHolder ? (
					isDataValid ? (
						<div className={styles.infoDiv}>
							<div className={styles.infoHeader}>
								<h2>Welcome, {holder.data?.name}</h2>
								<p>your phone: +{holder.data?.phone}</p>
								<p>your company: {holder.data?.company}</p>
								<p>your id: {holder.data?.holder_id}</p>
							</div>
							<hr />
							<HolderEditForm holder={holder.data} />
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
						<h2>Sorry, it looks like you are not a holder</h2>
						<p>try register as holder to get access to this page</p>
					</div>
				)}
			</main>
		</Layout>
	)
}
