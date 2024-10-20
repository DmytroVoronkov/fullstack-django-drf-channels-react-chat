import React, { createContext } from "react";
import { AuthServiceProps } from "../@types/auth-service";
import useAuthService from '../services/AuthService';

export const AuthServiceContext = createContext<AuthServiceProps | null>(null);

export function AuthServiceProvider({ children }: React.PropsWithChildren) {
  const authService = useAuthService();
  return <AuthServiceContext.Provider value={authService}>{children}</AuthServiceContext.Provider>;
}

// // FIXME: Make separate file with hook
// export function useAuthServiceContext(): AuthServiceProps {
//   const context = useContext(AuthServiceContext);

//   if (!context) {
//     throw new Error("You have to use AuthServiceProvider");
//   }

//   return context;
// }

export default AuthServiceProvider;
