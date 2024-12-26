import { IEvent } from '@src/types/serverAPITypes'
import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Table } from '../Tables/Table'
import styles from './EventsTable.module.scss'

interface IEventsTableProps {
	events: IEvent[]
}

interface IDisplayedEvent {
	name: string
	date: string | Date
	description: string
	type: string
	id: string
}

const columnHelper = createColumnHelper<IDisplayedEvent>()
const columns = [
	columnHelper.accessor('id', {
		header: () => 'Id',
	}),
	columnHelper.accessor('name', {
		header: () => 'Name',
	}),
	columnHelper.accessor('date', {
		header: () => 'Date',
	}),
	columnHelper.accessor('type', {
		header: () => 'Type',
	}),
	columnHelper.accessor('description', {
		header: () => 'Description',
	}),
]

function convertTableData(events: IEvent[]) {
	const displayedEvents: IDisplayedEvent[] = []
	events.forEach(event => {
		displayedEvents.push({
			name: event.name,
			date: event.date,
			type: event.type,
			description: event.description,
			id: event.event_id.toString(),
		})
	})
	return displayedEvents
}

export function EventsTable({ events }: IEventsTableProps) {
	const [data, setData] = useState<IDisplayedEvent[]>(convertTableData(events))

	useEffect(() => {
		setData(convertTableData(events))
	}, [events])

	return (
		<div className={styles.events}>
			<Table data={data} columns={columns} />
		</div>
	)
}
