import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import useAuthService from "../services/AuthService";
const API_BASE_URL = BASE_URL;

const useAxiosWithInterceptor = (): AxiosInstance => {
	const jwtAxios = axios.create({ baseURL: API_BASE_URL, withCredentials: true });
	const navigate = useNavigate();
	const { logout } = useAuthService()
	jwtAxios.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const originalRequest = error.config as AxiosRequestConfig;

			if (error.response?.status === 401 || error.response?.status === 403) {
				try {
					const response = await axios.post<{ access: string }>(`${BASE_URL}/token/refresh/`, {}, {withCredentials: true})

					if (response.status === 200) {
						return jwtAxios(originalRequest)
					}
				} catch (e) {
					console.log(e)
					logout()
					navigate("/login")
					return Promise.reject(e)
				}
			}
			throw error;
		}
	);

	return jwtAxios;
};

export default useAxiosWithInterceptor;
