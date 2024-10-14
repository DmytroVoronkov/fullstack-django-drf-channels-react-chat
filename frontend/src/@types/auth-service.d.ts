interface LoginResponse { access: string, refresh: string }

export interface AuthServiceProps {
    isLoggedIn: boolean
    login: (username: string, password: string) => Promise<LoginResponse | null>
    logout: () => void
}