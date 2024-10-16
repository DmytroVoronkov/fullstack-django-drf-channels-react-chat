import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const API_BASE_URL = BASE_URL;

const useAxiosWithInterceptor = (): AxiosInstance => {
	const jwtAxios = axios.create({ baseURL: API_BASE_URL, withCredentials: true });
	const navigate = useNavigate();

	jwtAxios.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const originalRequest = error.config as AxiosRequestConfig;

			if (error.response?.status === 401 || error.response?.status === 403) {
				const refreshToken = localStorage.getItem("refresh_token")

				if (refreshToken) {
					console.log("token is expired, trying refresh")
					try {
						const refreshResponse = await axios.post<{ access: string }>(`${BASE_URL}/token/refresh/`, { refresh: refreshToken })
						const accessToken = refreshResponse.data.access

						localStorage.setItem("access_token", accessToken)

						if (originalRequest.headers) {
							originalRequest.headers["Authorization"] = `Bearer ${accessToken}`
						}

						return jwtAxios(originalRequest)

					} catch (e) {
						console.log(e)
						navigate("/login")
						throw e;
					}
				} else {
					navigate("/login")
				}
			}
			throw error;
		}
	);

	return jwtAxios;
};

export default useAxiosWithInterceptor;
