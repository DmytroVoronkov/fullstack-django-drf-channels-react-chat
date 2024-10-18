interface LoginResponse { refresh: string, user_id: number }

export interface AuthServiceProps {
    isLoggedIn: boolean
    login: (username: string, password: string) => Promise<LoginResponse | null>
    logout: () => void
}