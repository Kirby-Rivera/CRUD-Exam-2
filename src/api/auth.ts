import { fetcher } from "@/utils/axiosRegistry";
import {
  FormDataType,
  LoginResponse,
  SignupRequest,
  CommonResponse,
} from "@/configs/types";

export function authLogin(formData: FormDataType): Promise<LoginResponse> {
  return fetcher("POST", "/auth/login", formData);
}

export function authSignup(formData: SignupRequest): Promise<CommonResponse> {
  return fetcher("POST", "/user/signup", formData);
}
