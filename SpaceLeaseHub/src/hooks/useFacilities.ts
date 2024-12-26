import { useQuery } from '@tanstack/react-query'
import { IFacility } from '../types/serverAPITypes'
import axios from '../utils/axiosConfig'

const getFacilities = async () => {
	return await axios.get<IFacility[]>(`/facilities`)
}

export function useFacilities() {
	const { data, isLoading } = useQuery({
		queryKey: ['facilities'],
		queryFn: getFacilities,
		select: data => data.data,
		enabled: true,
	})

	return { data, isLoading }
}
