import { Footer } from '@components/footer/Footer'
import { Header } from '@components/header/header'
import { ReactNode } from 'react'

interface ILayoutProps {
	children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
	return (
		<>
			<Header />
			<>{children}</>
			<Footer />
		</>
	)
}
