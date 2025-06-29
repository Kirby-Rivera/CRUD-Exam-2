import { createContext, useContext, useState, ReactNode } from "react";
import cookies from "@/utils/cookies";
import { SESSION_COOKIE } from "@/configs/constants";
import { authLogin, authSignup } from "@/api/auth";
import { useRouter } from "next/router";
import { FormDataType, SignupRequest } from "@/configs/types";

interface AuthContextType {
  isAuth: boolean;
  login: (formData: FormDataType) => Promise<void>;
  signup: (formData: SignupRequest) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth, setIsAuth] = useState<boolean>(!!cookies.get(SESSION_COOKIE));
  const router = useRouter();

  async function login(formData: FormDataType): Promise<void> {
    try {
      const response = await authLogin(formData);

      cookies.set(SESSION_COOKIE, response.data.token);

      setIsAuth(true);

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  async function signup(formData: SignupRequest): Promise<void> {
    try {
      const response = await authSignup(formData);

      console.log(response.message);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  function logout(): void {
    cookies.remove(SESSION_COOKIE);
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
