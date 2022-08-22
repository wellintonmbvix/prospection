import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext } from "../../types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

interface UsuarioRequest {  
  usuarioId: string;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<UsuarioRequest | null>();

  useEffect(() => {
    const user = getUserLocalStorage();    

    if (user !== null) {
      setUser(user);
    }
  }, []);

  async function authenticate(nome: string, senha: string) {
        
    const response = await LoginRequest(nome, senha);   
    
    if (response?.request.status !== 201) {
      //throw new Error(response?.data.message);     
  
      const payload = null;
  
      setUser(payload);
      setUserLocalStorage(payload);
    } else {
      const usuarioId = response?.data.usuarioId
  
      const payload = { token: response.data.token, usuarioId };
  
      setUser(payload);
      setUserLocalStorage(payload);
    }

  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
