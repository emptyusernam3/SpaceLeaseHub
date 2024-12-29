import { IReview } from '@src/types/serverAPITypes'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import styles from './reports.module.scss'

interface IReviewsReportProps {
	reviews: IReview[]
}

export function ReviewsReport({ reviews }: IReviewsReportProps) {
	async function excelDownloadHandler() {
		const workbook = new Excel.Workbook()
		const worksheet = workbook.addWorksheet('Exercise Machines')

		worksheet.columns = [
			{ header: 'id', key: 'id', width: 9 },
			{ header: 'comment', key: 'comment', width: 100 },
			{ header: 'rate', key: 'rate', width: 9 },
			{ header: 'client id', key: 'client_id', width: 9 },
			{ header: 'facility id', key: 'facility_id', width: 9 },
		]
		reviews.forEach(review => {
			worksheet.addRow({
				id: review.review_id,
				comment: review.comment,
				rate: review.rate,
				client_id: review.clientClientId,
				facility_id: review.facilityFacilityId,
			})
		})

		const buffer = await workbook.xlsx.writeBuffer()
		saveAs(new Blob([buffer]), 'reviews.xlsx')
	}

	return (
		<div className={styles.reportsDiv}>
			<h2>Export report</h2>
			<div>
				<button onClick={excelDownloadHandler}>Excel</button>
			</div>
		</div>
	)
}
