import { AxiosError } from "axios"

interface LoginResponse { user_id: number }

export interface AuthServiceProps {
    isLoggedIn: boolean
    register: (username: string, password: string) => Promise<number>
    login: (username: string, password: string) => Promise<LoginResponse | AxiosError>
    logout: () => void
    refreshAccessToken: () => Promise<void>
}