import request from "axios";
import { api } from "../../hooks/useApi";

interface UsuarioRequest {
  nome: string;
}

export function setUserLocalStorage(usuario: UsuarioRequest | null) {
  if(usuario !== null){
    localStorage.setItem("u", JSON.stringify(usuario)); 
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

export async function LoginRequest(nome: string, senha: string) {
  try {
    
    const req = await api.post("login", { nome, senha });
    
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
