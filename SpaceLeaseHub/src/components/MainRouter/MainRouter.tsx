import { Auth } from '@pages/auth/auth'
import { Client } from '@pages/client/client'
import { Holder } from '@pages/holder/holder'
import { Main } from '@pages/main/main'
import { Registration } from '@pages/registration/registration'
import { ClientFacilities } from '@src/pages/clientFacilities/clientFacilities'
import { DetailedFacility } from '@src/pages/detailedFacility/detailedFacility'
import { Events } from '@src/pages/events/events'
import { HolderFacilities } from '@src/pages/holderFacilities/holderFacilities'
import { Services } from '@src/pages/services/services'
import { Route, Routes } from 'react-router-dom'

const MainRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/events' element={<Events />} />
				<Route path='/services' element={<Services />} />
				<Route path='/*' element={<Main />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/client' element={<Client />} />
				<Route path='/holder' element={<Holder />} />
				<Route path='/holderFacilities' element={<HolderFacilities />} />
				<Route path='/clientFacilities' element={<ClientFacilities />} />
				<Route path='/detailedFacility/:id' element={<DetailedFacility />} />
			</Routes>
		</>
	)
}

export default MainRouter
