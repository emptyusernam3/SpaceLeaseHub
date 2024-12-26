import { useQuery } from '@tanstack/react-query'
import { IFacility } from '../types/serverAPITypes'
import axios from '../utils/axiosConfig'

const getHolderFacilities = async (id: number) => {
	return await axios.get<IFacility[]>(`/facilities/holder/${id}`)
}

export function useHolderFacilities(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['facilities', id],
		queryFn: () => getHolderFacilities(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}
