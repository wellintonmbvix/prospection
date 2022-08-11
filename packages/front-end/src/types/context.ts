interface UsuarioRequest {
    nome?: string;
}

export interface IContext extends UsuarioRequest {
    authenticate: (nome: string, senha: string) => Promise<void>;
    logout: () => void;
}