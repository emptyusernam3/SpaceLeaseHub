import { useEffect, useRef, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import styles from './header.module.scss'

export function Header() {
	const [isRole, setIsRole] = useState(true)
	const [isClient, setIsClient] = useState(false)
	const linkList = useRef<HTMLUListElement>(null)

	useEffect(() => {
		setIsRole(!!localStorage.getItem('role'))
		setIsClient(localStorage.getItem('role') === 'client')
	}, [])

	const burgerHandler = () => {
		if (linkList && linkList.current) {
			if (linkList.current.classList.contains(`${styles.active}`)) {
				linkList.current.classList.remove(`${styles.active}`)
			} else {
				linkList.current.classList.add(`${styles.active}`)
			}
		}
	}
	return (
		<header className={styles.header}>
			<div className={styles.logoDiv}>
				<Link to='/'>
					<h3>SpaceLeaseHub</h3>
				</Link>
			</div>
			<nav>
				<button className={styles.burgerButton} onClick={burgerHandler}>
					<RxHamburgerMenu size={70} />
				</button>
				<ul ref={linkList} className={styles.linksList}>
					{isRole ? (
						<>
							<li>
								<Link to={isClient ? '/client' : '/holder'} className={styles.navLink}>
									profile
								</Link>
							</li>
							{isClient ? (
								<li>
									<Link to={'/events'} className={styles.navLink}>
										events
									</Link>
								</li>
							) : (
								<li>
									<Link to={'/services'} className={styles.navLink}>
										services
									</Link>
								</li>
							)}
							<li>
								<Link to={isClient ? '/clientFacilities' : '/holderFacilities'} className={styles.navLink}>
									my facilities
								</Link>
							</li>
						</>
					) : (
						<li>
							<Link to={'/auth'} className={styles.navLink}>
								log in
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}
