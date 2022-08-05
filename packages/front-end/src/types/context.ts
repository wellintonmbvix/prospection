interface UsuarioRequest {
    name?: string;
}

export interface IContext extends UsuarioRequest {
    authenticate: (name: string, password: string) => Promise<void>;
    logout: () => void;
}