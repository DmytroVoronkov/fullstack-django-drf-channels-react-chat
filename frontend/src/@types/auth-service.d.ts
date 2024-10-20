import { AxiosError } from "axios"

interface LoginResponse { refresh: string, user_id: number }

export interface AuthServiceProps {
    isLoggedIn: boolean
    login: (username: string, password: string) => Promise<LoginResponse | AxiosError>
    logout: () => void
    refreshAccessToken: () => Promise<void>
}