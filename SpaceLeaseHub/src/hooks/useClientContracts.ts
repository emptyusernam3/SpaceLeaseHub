import { useQuery } from '@tanstack/react-query'
import { IContract } from '../types/serverAPITypes'
import axios from '../utils/axiosConfig'

const getClientContracts = async (id: number) => {
	return await axios.get<IContract[]>(`/contracts/client/${id}`)
}

export function useClientContracts(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['contracts', id],
		queryFn: () => getClientContracts(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}
