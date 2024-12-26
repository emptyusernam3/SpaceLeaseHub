import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://localhost:7000/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

export const setAuthHeader = (token: string) => {
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axiosInstance
