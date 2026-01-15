import { apiRequest } from "./apiClient";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginWithEmail = async (payload: LoginPayload) => {
  return apiRequest("/postPerson/verify_Login", {
    method: "POST",
    body: payload,
  });
};
