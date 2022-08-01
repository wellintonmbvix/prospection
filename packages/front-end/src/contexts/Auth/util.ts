import request from "axios";
import { api } from "../../hooks/useApi";
import { IUser } from "../../types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("u");

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

export async function LoginRequest(name: string, password: string) {
  try {
    
    const req = await api.post("login", { name, password });
    
    return req;
  } catch (error) {    
    if (request.isAxiosError(error) && error.response) {
      if (error.response?.status !== 201) {
        const { token, message } = JSON.parse(error.response?.request.response);
        throw new Error(message);
      }
    }
  }
}
