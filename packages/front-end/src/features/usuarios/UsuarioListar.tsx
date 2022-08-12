import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query";
import { Usuario } from "../../types";
import { ColumnType, DataGrid, Dialog, Snackbar } from "../../components";
import { api } from "../../hooks/useApi";
import { AxiosError } from "axios";

const { useDialog } = Dialog
const { useSnackbar } = Snackbar;

export default function UsuarioListar() {
  const { data, isFetching } = useQuery<Usuario[]>(["usuarios"], async () => {
    const response = await api.get("/users");

    return response.data;
  });  

  const queryClient = useQueryClient()
  const dialog = useDialog();
  const snackbar = useSnackbar();

  const deleteUsuario = async (id: string) => {
    const response = await api.delete(`/users/${id}`);

    return response.statusText;
  }

  const mutation = useMutation(deleteUsuario, {
    onSuccess: () => {
      snackbar.success("Usuário excluído com sucesso!");
      queryClient.invalidateQueries(['usuarios']);
    },
    onError: (error: AxiosError) => {
      snackbar.error(`Erro ao excluí usuário. ${JSON.stringify(error.response?.data)}`);
    }
  })

  const columns: ColumnType[] = [
    {
      key: "nomeUsuario",
      title: "Nome de Usuário",
      index: "nomeUsuario",
      className: "w-[30%]",
    },
    {
      key: "acessoUsuarios",
      title: "Acessa Usuários",
      className: "w-[20%]",
      render: (row) => (
        <div className="text-center">
          {row.acessoUsuarios === true ? "Sim" : "Não"}
        </div>
      ),
    },
    {
      key: "acessoSeguimentos",
      title: "Acessa Seguimentos",
      className: "w-[20%]",
      render: (row) => (
        <div className="text-center">
          {row.acessoSeguimentos === true ? "Sim" : "Não"}
        </div>
      ),
    },
    {
      key: "acessoProspeccao",
      title: "Acessa Prospeção",
      className: "w-[20%]",
      render: (row) => (
        <div className="text-center">
          {row.acessoProspeccao === true ? "Sim" : "Não"}
        </div>
      ),
    },
    {
      key: "acoes",
      title: "Ações",
      className: "w-[10%]",
      render: (row) => (
        <div className="flex items-center space-x-2 w-14">
          <Link to={`/users/editar?id=${row.usuarioId}`}>
            <PencilAltIcon className="w-6 h-6 stroke-gray-700 dark:stroke-gray-50 hover:cursor-pointer" />
          </Link>
          <Link to="#" onClick={ () => {
            dialog.show({
              title: "Usuários",
              message: `Deseja realmente excluir o usuário ${row.nomeUsuario}?`,
              okText: "Sim",
              cancelText: "Não",
              onOk: () => {
                mutation.mutate(row.usuarioId);
              },
            })
          }}> <TrashIcon className="w-6 h-6 stroke-red-700 hover:cursor-pointer" /> </Link>          
        </div>
      ),
    },
  ];

  return (
    <DataGrid
      dataSource={data}
      columns={columns}
      rowKey={(row) => row.usuarioId}
      loading={isFetching}
    />
  );
}
