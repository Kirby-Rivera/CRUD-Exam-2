import { fetcher } from "@/utils/axiosRegistry";
import { FormDataType, LoginResponse } from "@/configs/types";

export function authLogin(formData: FormDataType): Promise<LoginResponse> {
  return fetcher("POST", "/auth/login", formData);
}
