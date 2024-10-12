import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { BASE_URL } from "../config";

export default function useAuthService(): AuthServiceProps {
    const login = async (username: string, password: string) => {
        try {
            // FIXME: Fix typing
            const response = await axios.post<{ token: string, refresh: string }>(`${BASE_URL}/token/`, {
                username, password
            })
            console.log(response)
            return response.data
            // FIXME: Type error
        } catch (e) {
            console.log(e)

            return null
        }
    }

    return { login }
}