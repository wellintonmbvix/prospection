export interface Prospeccao {
  prospeccaoId: string;
  nomeEmpresa: string;
  nomeContato: string;
  telefone1: string;
  telefone2: string;
  email1: string;
  email2: string;
  id_seguimento: string;
  seguimento: {
    seguimentoId: string;
    descricao: string;
  };
  cidade: string;
  estado: string;
  proximoContato: string;
  nomeSistema: string;
  observacao: string;
  ativo: boolean;
  id_usuario: string | undefined;
  usuario: {
    usuarioId: string;
    nomeUsuario: string;
  }
}
