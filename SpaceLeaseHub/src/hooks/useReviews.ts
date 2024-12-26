import { useQuery } from '@tanstack/react-query'
import { IReview } from '../types/serverAPITypes'
import axios from '../utils/axiosConfig'

const getReviews = async (id: number) => {
	return await axios.get<IReview[]>(`/reviews/facility/${id}`)
}

export function useReviews(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['reviews', id],
		queryFn: () => getReviews(id),
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isLoading }
}
