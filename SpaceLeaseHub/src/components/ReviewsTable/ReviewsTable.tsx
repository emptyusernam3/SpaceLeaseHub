import { IReview } from '@src/types/serverAPITypes'
import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Table } from '../Tables/Table'
import styles from './ReviewsTable.module.scss'

interface IReviewsTableProps {
	reviews: IReview[]
}

interface IDisplayedReview {
	comment: string
	rate: string
	id: string
}

const columnHelper = createColumnHelper<IDisplayedReview>()
const columns = [
	columnHelper.accessor('rate', {
		header: () => 'Rate',
	}),
	columnHelper.accessor('comment', {
		header: () => 'Comment',
	}),
	columnHelper.accessor('id', {
		header: () => 'ID',
	}),
]

function convertTableData(reviews: IReview[]) {
	const displayedReviews: IDisplayedReview[] = []
	reviews.forEach(review => {
		displayedReviews.push({
			rate: review.rate.toString(),
			comment: review.comment,
			id: review.review_id.toString(),
		})
	})
	return displayedReviews
}

export function ReviewsTable({ reviews }: IReviewsTableProps) {
	const [data, setData] = useState<IDisplayedReview[]>(convertTableData(reviews))

	useEffect(() => {
		setData(convertTableData(reviews))
	}, [reviews])

	return (
		<div className={styles.reviews}>
			<Table data={data} columns={columns} />
		</div>
	)
}
