export interface Usuario {
    usuarioId: string;
    nomeUsuario?: string;
    senhaAcesso?: string;
    acessoUsuarios?: boolean;
    acessoSeguimentos?: boolean;
    acessoProspeccao?: boolean;
}