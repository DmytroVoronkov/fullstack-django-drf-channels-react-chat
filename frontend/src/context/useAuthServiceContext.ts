
import { AuthServiceProps } from "../@types/auth-service";
import { useContext } from "react";
import { AuthServiceContext } from './AuthContext';

export function useAuthServiceContext(): AuthServiceProps {
    const context = useContext(AuthServiceContext);

    if (!context) {
        throw new Error("You have to use AuthServiceProvider");
    }

    return context;
}