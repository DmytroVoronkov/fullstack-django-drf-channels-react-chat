import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { BASE_URL } from "../config";

// FIXME: Move to separate file
interface LoginResponse { access: string, refresh: string }
interface UserDetailsResponse {username: string}

export default function useAuthService(): AuthServiceProps {
    const getUserDetails = async () => {
        try {
            // FIXME: Create local storage service
            const user_id = localStorage.getItem("user_id")
            const access = localStorage.getItem("access_token")
            // FIXME: Fix typing && Refactor urls
            const response = await axios.get<UserDetailsResponse>(`${BASE_URL}/account/?user_id=${user_id}`, {headers: {Authorization: `Bearer ${access}`}})

            const { username } = response.data

            localStorage.setItem("username", username)

            // return response.data
            // FIXME: Type error
        } catch (e) {
            console.log(e)

            return null
        }
    }

    const getUserId = (token: string) => {
        const [, encodedPayload,] = token.split(".")
        const decodedPayload = atob(encodedPayload)
        const payloadData = JSON.parse(decodedPayload) as { user_id: string } // FIXME: Fix typing
        const user_id = payloadData.user_id

        return user_id
    }

    const login = async (username: string, password: string) => {
        try {
            // FIXME: Fix typing
            const response = await axios.post<LoginResponse>(`${BASE_URL}/token/`, {
                username, password
            })

            const { refresh, access } = response.data

            // FIXME: Create localStorage service && Change to Cookie
            localStorage.setItem("access_token", access)
            localStorage.setItem("refresh_token", refresh)
            localStorage.setItem("user_id", getUserId(access))

            getUserDetails()

            return response.data
            // FIXME: Type error
        } catch (e) {
            console.log(e)

            return null
        }
    }

    return { login }
}