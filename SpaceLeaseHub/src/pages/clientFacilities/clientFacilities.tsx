import { Modal } from '@components/modal/modal'
import { useClient } from '@hooks/useClient'
import { useClientContracts } from '@hooks/useClientContracts'
import { Layout } from '@src/layout/layout'
import { IContract } from '@src/types/serverAPITypes'
import { useQueryClient } from '@tanstack/react-query'
import axios from '@utils/axiosConfig'
import { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import styles from './clientFacilities.module.scss'

export function ClientFacilities() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const [deleteContract, setDeleteContract] = useState<IContract | null>(null)
	const [isModalVisible, setModalVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isClient, setIsClient] = useState(true)
	const [isContractsValid, setIsContractsValid] = useState(true)

	const clientId = parseInt(localStorage.getItem('clientId') ?? '')
	const client = clientId ? useClient(clientId) : { data: null, isLoading: true }
	const contracts = clientId ? useClientContracts(clientId) : { data: null, isLoading: true }

	useEffect(() => {
		setIsLoading(!client.isLoading && !contracts.isLoading)
		setIsClient(!!client.data)
		setIsContractsValid(!!contracts.data && !!contracts.data?.length)
	}, [client, contracts])

	function facilityClickHandler(id: number) {
		sessionStorage.setItem('prevPage', '/clientFacilities')
		navigate(`/detailedFacility/${id}`)
	}

	async function deleteSubmitHandler() {
		if (deleteContract && deleteContract?.contract_id > 0) {
			const response = await axios.delete(`/contracts/${deleteContract.contract_id}`)
			if (response.status === 200 || response.status === 201) {
				const response2 = await axios.put(`/facilities/${deleteContract.facilityFacilityId}`, { status: 'free' })
				if (response2.status === 200 || response2.status === 201) {
					queryClient.invalidateQueries({ queryKey: ['contracts', deleteContract.clientClientId] })
					setModalVisible(false)
				} else {
					alert('error3')
				}
			} else {
				alert('error2')
			}
		} else {
			alert('error')
		}
	}

	return (
		<Layout>
			<main className={styles.main}>
				{isClient ? (
					isLoading ? (
						<div className={styles.infoDiv}>
							<div className={styles.infoHeader}>
								<h2>Hello, {client.data?.name}</h2>
								<p>take a look at your contracts</p>
							</div>
							{isContractsValid ? (
								<div className={styles.info}>
									<h2>you can wiew page of facility by clicking on contract id</h2>
									<ul className={styles.row}>
										<li className={styles.li1}>contractId</li>
										<li className={styles.li2}>date</li>
										<li className={styles.li3}>facilityId</li>
										<li className={styles.li4}>holderId</li>
										<li className={styles.li5}></li>
									</ul>
									{contracts.data?.map(contract => {
										return (
											<ul key={contract.contract_id} className={styles.row}>
												<li
													className={`${styles.li1} ${styles.pointer}`}
													onClick={() => facilityClickHandler(contract.facilityFacilityId)}
												>
													{contract.contract_id}
												</li>
												<li className={styles.li2}>{contract.date as string}</li>
												<li className={styles.li3}>{contract.facilityFacilityId}</li>
												<li className={styles.li4}>{contract.holderHolderId}</li>
												<li
													className={`${styles.li5} ${styles.pointer}`}
													onClick={() => {
														setModalVisible(true)
														setDeleteContract(contract)
													}}
												>
													<FaTrashAlt size={20} />
												</li>
											</ul>
										)
									})}
								</div>
							) : (
								<div className={styles.info}>
									<h2>Sorry, it looks like you haven't rented any facilities yet</h2>
								</div>
							)}
						</div>
					) : (
						<div>
							<h1>Loading...</h1>
						</div>
					)
				) : (
					<div>
						<h1>Error</h1>
						<h2>Sorry, it looks like you are not a client</h2>
						<p>try register as client to get access to this page</p>
					</div>
				)}
				{isModalVisible && (
					<Modal onClose={() => setModalVisible(false)}>
						<h2>are you sure you want to delete this contract?</h2>
						<button type='button' className={styles.submitButton} onClick={() => deleteSubmitHandler()}>
							confirm
						</button>
					</Modal>
				)}
			</main>
		</Layout>
	)
}
