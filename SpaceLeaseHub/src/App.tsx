import ReactQueryProvider from '@utils/providers/reactQueryProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainRouter from './components/MainRouter/MainRouter'

function App() {
	return (
		<ReactQueryProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/*' element={<MainRouter />} />
				</Routes>
			</BrowserRouter>
		</ReactQueryProvider>
	)
}

export default App
