import { IdInputField } from '@components/inputFields/idInputField'
import { ReviewsReport } from '@components/reports/ReviewsReport'
import { ReviewsTable } from '@components/ReviewsTable/ReviewsTable'
import { useReviews } from '@hooks/useReviews'
import { IReview } from '@src/types/serverAPITypes'
import { useQueryClient } from '@tanstack/react-query'
import { FormEvent, useEffect, useState } from 'react'
import axios from '../../utils/axiosConfig'
import styles from './Reviews.module.scss'

interface IReviewsProps {
	clientId?: number
	facilityId: number
}

export function Reviews({ facilityId, clientId }: IReviewsProps) {
	const queryClient = useQueryClient()
	const [isClient, setIsClient] = useState(false)
	const [isReviewsValid, setReviewsValid] = useState(false)
	const [isReviewsExists, setReviewsExists] = useState(false)

	const reviews = useReviews(facilityId)

	useEffect(() => {
		setIsClient(!!clientId)
		setReviewsValid(!reviews.isLoading)
		setReviewsExists(!!reviews.data?.length)
	}, [reviews])

	async function commentSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const rate = parseInt(formData.get('rate') as string)
		if (rate > 5 || rate < 1) {
			alert('error: rate must be from 1 to 5')
		} else {
			const data = {
				facilityFacilityId: facilityId,
				clientClientId: clientId,
				rate: parseInt(formData.get('rate') as string),
				comment: formData.get('comment'),
			}
			const response = await axios.post('/reviews', data)
			if (response.status === 200 || response.status === 201) {
				queryClient.invalidateQueries({ queryKey: ['reviews', facilityId] })
			}
		}
	}
	async function commentDeleteHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const id = parseInt(formData.get('id') as string)
		try {
			const review = await axios.get<IReview | null>(`/reviews/${id}`)

			if (review.data?.clientClientId === clientId) {
				const response = await axios.delete(`/reviews/${id}`)
				if (response.status === 200 || response.status === 201) {
					queryClient.invalidateQueries({ queryKey: ['reviews', facilityId] })
				}
			} else {
				alert('you can remove only your coments')
			}
		} catch {
			alert("error: review whith this id doesn't exists")
		}
	}

	return (
		<>
			{isReviewsValid ? (
				<>
					<div className={styles.comments}>
						{isClient && (
							<div className={styles.add}>
								<form className={styles.form} onSubmit={commentSubmitHandler}>
									<div>
										<div className={styles.rate}>
											<label htmlFor='rate'>rate(1 - 5)</label>
											<input type='number' id='rate' name='rate' required />
										</div>
										<textarea name='comment' className={styles.comment} placeholder='enter your review'></textarea>
									</div>
									<button type='submit' className={styles.submitButton}>
										send
									</button>
								</form>
								<hr />
								<form className={`${styles.form} ${styles.delform}`} onSubmit={commentDeleteHandler}>
									<div>
										<IdInputField />
									</div>

									<button type='submit' className={styles.submitButton}>
										delete
									</button>
								</form>
								<hr />
							</div>
						)}
						{isReviewsExists ? (
							reviews.data && <ReviewsTable reviews={reviews.data} />
						) : (
							<div className={styles.loading}>
								<h2>There are no reviews here yet</h2>
							</div>
						)}
					</div>
					{isReviewsExists && reviews.data && <ReviewsReport reviews={reviews.data} />}
				</>
			) : (
				<div className={styles.loading}>
					<h2>Loading...</h2>
				</div>
			)}
		</>
	)
}
