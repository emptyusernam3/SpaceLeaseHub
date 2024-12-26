import { useQuery } from '@tanstack/react-query'
import axios from '@utils/axiosConfig'
import { IHolder } from '../types/serverAPITypes'

const getHolder = async (id: number) => {
	return await axios.get<IHolder | undefined>(`/holders/${id}`)
}

export function useHolder(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['holder', id],
		queryFn: () => getHolder(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}
