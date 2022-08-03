import { getUserLocalStorage } from "../contexts/Auth/util";
import { api } from "../hooks/useApi";

const user = getUserLocalStorage();

export async function getUsersAll(){
    
    const usuario = await api.get("/users",{
        headers: {
            'Authorization': `${user.token}`
        }
    });

    return usuario;
}
