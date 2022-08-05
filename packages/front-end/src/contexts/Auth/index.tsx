import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext } from "../../types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

interface UsuarioRequest {
  name: string;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<UsuarioRequest | null>();

  useEffect(() => {
    const user = getUserLocalStorage();
    
    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(name: string, password: string) {
    
    const response = await LoginRequest(name, password);   
    
    if (response?.request.status !== 201) {
      throw new Error(response?.data.message);
    }

    const payload = { token: response.data.token, name };

    setUser(payload);
    setUserLocalStorage(payload);
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
