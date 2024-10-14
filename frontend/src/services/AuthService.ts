import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { BASE_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// FIXME: Move to separate file
interface LoginResponse { access: string, refresh: string }
interface UserDetailsResponse { username: string }

export default function useAuthService(): AuthServiceProps {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const isLogged = localStorage.getItem("isLoggedIn")

        return isLogged === "true"
    }
    )


    // FIXME: Move to context maybe????
    const getUserDetails = async () => {
        try {
            // FIXME: Create local storage service
            const user_id = localStorage.getItem("user_id")
            const access = localStorage.getItem("access_token")
            // FIXME: Fix typing && Refactor urls
            const response = await axios.get<UserDetailsResponse>(`${BASE_URL}/account/?user_id=${user_id}`, { headers: { Authorization: `Bearer ${access}` } })

            const { username } = response.data

            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("username", username)
            setIsLoggedIn(true)
            // return response.data
            // FIXME: Type error
        } catch (e) {
            console.log(e)
            localStorage.setItem("isLoggedIn", "false")
            return null
        }
    }

    const getUserId = (token: string) => {
        // FIXME: Create helper function
        const [, encodedPayload,] = token.split(".")
        const decodedPayload = atob(encodedPayload)
        const payloadData = JSON.parse(decodedPayload) as { user_id: string } // FIXME: Fix typing
        const user_id = payloadData.user_id

        return user_id
    }

    const login = async (username: string, password: string) => {
        try {
            // FIXME: Fix typing && URL Builder
            const response = await axios.post<LoginResponse>(`${BASE_URL}/token/`, {
                username, password
            })

            const { refresh, access } = response.data

            // FIXME: Create localStorage service && Change to Cookie
            localStorage.setItem("access_token", access)
            localStorage.setItem("refresh_token", refresh)
            localStorage.setItem("user_id", getUserId(access))
            localStorage.setItem("isLoggedIn", "true")
            setIsLoggedIn(true)
            getUserDetails()
            return response.data
            // FIXME: Type error
        } catch (e) {
            console.log(e)

            return null
        }
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user_id")
        localStorage.setItem("isLoggedIn", "false")

    }

    return { login, logout, isLoggedIn }
}