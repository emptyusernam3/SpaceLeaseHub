import { IFacility } from '@src/types/serverAPITypes'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import { jsPDF } from 'jspdf'
import styles from './reports.module.scss'

interface IFacilitiesReportProps {
	facilities: IFacility[]
}

export function FacilitiesReport({ facilities }: IFacilitiesReportProps) {
	async function excelDownloadHandler() {
		const workbook = new Excel.Workbook()
		const worksheet = workbook.addWorksheet('Exercise Machines')

		worksheet.columns = [
			{ header: 'id', key: 'id', width: 4 },
			{ header: 'name', key: 'name', width: 40 },
			{ header: 'status', key: 'status', width: 20 },
			{ header: 'area', key: 'area', width: 10 },
			{ header: 'price', key: 'price', width: 10 },
			{ header: 'holderId', key: 'holderId', width: 8 },
		]
		facilities.forEach(facility => {
			worksheet.addRow({
				id: facility.facility_id,
				name: facility.name,
				status: facility.status,
				area: facility.area + ' m²',
				price: facility.price + ' $',
				holderId: facility.holderHolderId,
			})
		})

		const buffer = await workbook.xlsx.writeBuffer()
		saveAs(new Blob([buffer]), 'facilities.xlsx')
	}

	function pdfDownloadHandler() {
		const doc = new jsPDF()
		const pageWidth = doc.internal.pageSize.getWidth()
		const pageHeight = doc.internal.pageSize.getHeight()
		const margin = 20

		const drawHeader = (doc: any, page: any) => {
			doc.setFontSize(18)
			doc.setTextColor(40, 40, 40)
			doc.setFont('helvetica', 'bold')
			doc.text('Facilities Report', pageWidth / 2, 15, { align: 'center' })

			doc.setFontSize(12)
			doc.setFont('helvetica', 'normal')
			doc.setTextColor(100)
			doc.text(`Page ${page}`, pageWidth - margin, 15, { align: 'right' })

			doc.setDrawColor(200)
			doc.setLineWidth(0.5)
			doc.line(margin, 20, pageWidth - margin, 20)
		}

		const drawFooter = (doc: any) => {
			const currentDate = new Date().toLocaleDateString()
			doc.setFontSize(10)
			doc.setFont('helvetica', 'italic')
			doc.setTextColor(150)
			doc.text(`Generated on: ${currentDate}`, margin, pageHeight - 10)

			doc.setDrawColor(200)
			doc.setLineWidth(0.5)
			doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15)
		}

		facilities.forEach((facility, index) => {
			if (index !== 0) {
				doc.addPage()
			}

			drawHeader(doc, index + 1)

			doc.setFontSize(20)
			doc.setFont('helvetica', 'bold')
			doc.setTextColor(30, 30, 30)
			doc.text(`${facility.name}`, pageWidth / 2, 32, { align: 'center' })

			doc.setFontSize(14)
			doc.setFont('helvetica', 'normal')
			doc.text(`Facility ID: ${facility.facility_id}`, 10, 44)
			doc.text(`Holder ID: ${facility.holderHolderId}`, 10, 50)
			doc.text(`Area: ${facility.area} m²`, 10, 56)
			doc.text(`Price: ${facility.price} $`, 10, 62)
			doc.text(`Status: ${facility.status}`, 10, 68)

			if (facility.picture) {
				const img = new Image()
				img.src = `http://localhost:7000/${facility.picture}`
				const imgWidth = pageWidth - 2 * margin
				const imgHeight = imgWidth * 0.75 // Maintain aspect ratio
				doc.addImage(img, 'PNG', margin, 80, imgWidth, imgHeight)
			}

			drawFooter(doc)
		})

		doc.save('facilities.pdf')
	}

	return (
		<div className={styles.reportsDiv}>
			<h2>Export report</h2>
			<div>
				<button onClick={excelDownloadHandler}>Excel</button>
				<button onClick={pdfDownloadHandler}>Pdf</button>
			</div>
		</div>
	)
}
