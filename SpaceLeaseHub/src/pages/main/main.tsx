import { Facilities } from '@components/Facilities/Facilities'
import { Layout } from '@src/layout/layout'
import styles from './main.module.scss'

export function Main() {
	return (
		<Layout>
			<main className={styles.main}>
				<h1>Welcome to SpaceLeaseHub</h1>
				<p>take a look at facilities</p>
				<Facilities />
			</main>
		</Layout>
	)
}
