import { useQuery } from '@tanstack/react-query'
import { IService } from '../types/serverAPITypes'
import axios from '../utils/axiosConfig'

const getFacilityServices = async (id: number) => {
	return await axios.get<IService[]>(`/services/facility/${id}`)
}

export function useFacilityServices(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['services', id],
		queryFn: () => getFacilityServices(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}
