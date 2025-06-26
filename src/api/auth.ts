import { http } from "@/utils/axiosRegistry";
import { FormDataType, LoginResponse } from "@/configs/auth";

export function authLogin(formData: FormDataType): Promise<LoginResponse> {
  return http<LoginResponse>({
    method: "POST",
    endpoint: "/auth/login",
    formData,
  });
}
