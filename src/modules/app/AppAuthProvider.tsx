import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import cookies from "@/utils/cookies";
import { SESSION_COOKIE } from "@/configs/constants";
import { authLogin } from "@/api/auth";
import { useRouter } from "next/router";
import { LoginData, LoginResponse, FormDataType } from "@/configs/auth";

interface AuthContextType {
  isAuth: boolean;
  login: (formData: FormDataType) => Promise<void>;
  //   logout: () => void;
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

  return (
    <AuthContext.Provider value={{ isAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
