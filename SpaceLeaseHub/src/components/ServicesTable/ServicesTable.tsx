import { IService } from '@src/types/serverAPITypes'
import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Table } from '../Tables/Table'
import styles from './ServicesTable.module.scss'

interface IServicesTableProps {
	services: IService[]
}

interface IDisplayedService {
	name: string
	price: string
	description: string
	id: string
}

const columnHelper = createColumnHelper<IDisplayedService>()
const columns = [
	columnHelper.accessor('id', {
		header: () => 'Id',
	}),
	columnHelper.accessor('name', {
		header: () => 'Name',
	}),
	columnHelper.accessor('price', {
		header: () => 'Price',
	}),
	columnHelper.accessor('description', {
		header: () => 'Description',
	}),
]

function convertTableData(services: IService[]) {
	const displayedServices: IDisplayedService[] = []
	services.forEach(service => {
		displayedServices.push({
			name: service.name,
			price: service.price.toString(),
			description: service.description,
			id: service.service_id.toString(),
		})
	})
	return displayedServices
}

export function ServicesTable({ services }: IServicesTableProps) {
	const [data, setData] = useState<IDisplayedService[]>(convertTableData(services))

	useEffect(() => {
		setData(convertTableData(services))
	}, [services])

	return (
		<div className={styles.services}>
			<Table data={data} columns={columns} />
		</div>
	)
}
