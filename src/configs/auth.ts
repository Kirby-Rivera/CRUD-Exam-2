
export interface LoginData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  salt: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}


export interface LoginResponse {
  data: LoginData;
}


export interface FormDataType {
  email: string;
  password: string;
}