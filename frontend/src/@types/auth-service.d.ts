export interface AuthServiceProps {
    login: (username: string, password: string) => Promise<{token: string, refresh: string} | null>
    // logout: () => void
}