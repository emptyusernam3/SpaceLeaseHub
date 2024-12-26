import { useQuery } from '@tanstack/react-query'
import { IFacility } from '../types/serverAPITypes'
import axios from '../utils/axiosConfig'

const getFacility = async (id: number) => {
	return await axios.get<IFacility | null>(`/facilities/${id}`)
}

export function useFacility(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['facility', id],
		queryFn: () => getFacility(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}
