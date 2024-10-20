import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";
import { BASE_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// FIXME: Move to separate file
interface LoginResponse { refresh: string, user_id: number }
interface UserDetailsResponse { username: string }

export default function useAuthService(): AuthServiceProps {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const isLogged = localStorage.getItem("isLoggedIn")
        return isLogged === "true"
    })
    const navigate = useNavigate()


    // FIXME: Move to context maybe????
    const getUserDetails = async () => {
        try {
            const userId = localStorage.getItem("user_id")
            // FIXME: Fix typing && Refactor urls
            const response = await axios.get<UserDetailsResponse>(`${BASE_URL}/account/?user_id=${userId}`, { withCredentials: true })

            const { username } = response.data

            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("username", username)
            setIsLoggedIn(true)
            // return response.data
            // FIXME: Type error
        } catch (e) {
            console.log(e)
            setIsLoggedIn(false)
            localStorage.setItem("isLoggedIn", "false")
            return null
        }
    }

    const login = async (username: string, password: string) => {
        try {
            // FIXME: Fix typing && URL Builder
            const response = await axios.post<LoginResponse>(`${BASE_URL}/token/`, {
                username, password
            }, { withCredentials: true })

            const user_id = response.data.user_id
            console.log(user_id)
            // FIXME: Create localStorage service
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("user_id", user_id.toString())
            setIsLoggedIn(true)
            getUserDetails()
            return response.data
            // FIXME: Type error
        } catch (e) {
            console.log(e)

            return null
        }
    }

    const logout = async () => {
        localStorage.setItem("isLoggedIn", "false")
        localStorage.removeItem("user_id")
        localStorage.removeItem("username")
        setIsLoggedIn(false)

        try {
            await axios.post(`${BASE_URL}/logout/`, {}, { withCredentials: true })
        } catch (refreshError) {
            Promise.reject(refreshError)
        }

        navigate("/login")
    }

    const refreshAccessToken = async () => {
        try {
            await axios.post(`${BASE_URL}/token/refresh/`, {}, { withCredentials: true })
        } catch (refreshError) {
            console.log(refreshError)
            Promise.reject(refreshError)
        }
    }

    return { login, logout, isLoggedIn, refreshAccessToken }
}