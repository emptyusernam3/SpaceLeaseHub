import { useQuery } from '@tanstack/react-query'
import { IEvent } from '../types/serverAPITypes'
import axios from '../utils/axiosConfig'

const getEvents = async (id: number) => {
	return await axios.get<IEvent[]>(`/events/facility/${id}`)
}

export function useEvents(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['events', id],
		queryFn: () => getEvents(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}
