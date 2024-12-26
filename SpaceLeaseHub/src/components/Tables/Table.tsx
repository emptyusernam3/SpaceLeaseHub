import {
	Column,
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import styles from './Table.module.scss'

interface ITableProps<T> {
	data: T[]
	columns: ColumnDef<T, any>[]
}

export function Table<T>({ data, columns }: ITableProps<T>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data,
		columns,
		filterFns: {},
		state: {
			columnFilters,
		},
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})
	return (
		<div className={styles.container}>
			<table>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<th key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<>
												<div
													{...{
														className: header.column.getCanSort() ? `${styles.headerCell}` : '',
														onClick: header.column.getToggleSortingHandler(),
													}}
												>
													{flexRender(header.column.columnDef.header, header.getContext())}
													{{
														asc: ' ↑',
														desc: ' ↓',
													}[header.column.getIsSorted() as string] ?? null}
												</div>
												{header.column.getCanFilter() ? (
													<div>
														<Filter column={header.column} />
													</div>
												) : null}
											</>
										)}
									</th>
								)
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => {
									return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className={styles.paginationDiv}>
				<div className={styles.paginationButtonsDiv}>
					<button
						className={styles.paginationButton}
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						{'<<'}
					</button>
					<button
						className={styles.paginationButton}
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{'<'}
					</button>
					<button
						className={styles.paginationButton}
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						{'>'}
					</button>
					<button
						className={styles.paginationButton}
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						{'>>'}
					</button>
				</div>
				<div className={styles.GoToDiv}>
					<span className={styles.paginationPage}>
						<div>Page</div>
						<strong>
							{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
						</strong>
					</span>

					<span>
						| Go to page:
						<input
							type='number'
							min='1'
							max={table.getPageCount()}
							defaultValue={table.getState().pagination.pageIndex + 1}
							onChange={e => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0
								table.setPageIndex(page)
							}}
							className={styles.paginationGoToInput}
						/>
					</span>
					<select
						value={table.getState().pagination.pageSize}
						onChange={e => {
							table.setPageSize(Number(e.target.value))
						}}
						className={styles.paginationSelect}
					>
						{[5, 10, 20, 30, 40, 50].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	)
}
function Filter({ column }: { column: Column<any, unknown> }) {
	const columnFilterValue = column.getFilterValue()

	return (
		<DebouncedInput
			className={styles.filterInput}
			onChange={value => column.setFilterValue(value)}
			placeholder={`Search...`}
			type='text'
			value={(columnFilterValue ?? '') as string}
		/>
	)
}

function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number
	onChange: (value: string | number) => void
	debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value)
		}, debounce)

		return () => clearTimeout(timeout)
	}, [value])

	return <input {...props} value={value} onChange={e => setValue(e.target.value)} />
}
