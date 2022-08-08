import request from "axios";
import { api } from "../../hooks/useApi";

interface UsuarioRequest {
  name: string;
}

export function setUserLocalStorage(user: UsuarioRequest | null) {
  if(user !== null){
    localStorage.setItem("u", JSON.stringify(user)); 
  } else 
    localStorage.removeItem("u");
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
