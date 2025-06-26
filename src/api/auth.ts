import { http } from "@/utils/axiosRegistry";
import { FormDataType, LoginResponse } from "@/configs/types";

export function authLogin(formData: FormDataType): Promise<LoginResponse> {
  return http<LoginResponse>({
    method: "POST",
    endpoint: "/auth/login",
    formData,
  });
}
