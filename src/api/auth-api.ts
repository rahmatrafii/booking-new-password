import axios from "axios";

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await API.post(
    `/api/auth/reset-password/${data.token}`,
    data.password
  );
  return response.data;
};
