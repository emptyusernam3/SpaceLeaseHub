import axios from '../axiosConfig'

interface IResponse {
	email: string
	password: string
	role: string
	user_id: number
	client_id: number
	holder_id: number
}

export async function ChangePasswordHandler(email: string, password: string) {
	const response = await axios.get<IResponse | null>(`/users/email/${email}`)
	if (response.status === 200 || response.status === 201) {
		const response2 = await axios.put<IResponse | null>(`/users/${response.data?.user_id}`, {
			role: response.data?.role,
			email: email,
			password: password,
		})
		if (response2.status === 201 || response2.status === 200) {
			return response.data
		}
	} else {
		return '{"error":"invalid email"}'
	}
	return '{"error":"Internal server error"}'
}
