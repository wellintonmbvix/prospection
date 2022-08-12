import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query";
import { Seguimento } from "../../types";
import { ColumnType, DataGrid, Dialog, Snackbar } from "../../components";
import { api } from "../../hooks/useApi";
import { AxiosError } from "axios";

const { useDialog } = Dialog
const { useSnackbar } = Snackbar;

export default function SeguimentoListar() {
    const { data, isFetching } = useQuery<Seguimento[] | any>(["seguimentos"], async () => {
        const response = await api.get("/ratings");
    
        return response.data;
      }); 

      const queryClient = useQueryClient()
      const dialog = useDialog();
      const snackbar = useSnackbar();

      const deleteSeguimento = async (id: string) => {
        const response = await api.delete(`/ratings/${id}`);
    
        return response.statusText;
      }

      const mutation = useMutation(deleteSeguimento, {
        onSuccess: () => {
          snackbar.success("Seguimento excluído com sucesso!");
          queryClient.invalidateQueries(['seguimentos']);
        },
        onError: (error: AxiosError) => {
          snackbar.error(`Erro ao excluí seguimento. ${JSON.stringify(error.response?.data)}`);
        }
      })

      const columns: ColumnType[] = [
        {
            key: "descricao",
            title: "Seguimento",
            index: "descricao"
        },
        {
          key: "acoes",
          title: "Ações",
          className: "w-[10%]",
          render: (row) => (
            <div className="flex items-center space-x-2 w-14">
              <Link to={`/classification/editar?id=${row.seguimentoId}`}>
                <PencilAltIcon className="w-6 h-6 stroke-gray-700 dark:stroke-gray-50 hover:cursor-pointer" />
              </Link>
              <Link to="#" onClick={ () => {
                dialog.show({
                  title: "Usuários",
                  message: `Deseja realmente excluir o seguimento ${row.descricao}?`,
                  okText: "Sim",
                  cancelText: "Não",
                  onOk: () => {
                    mutation.mutate(row.seguimentoId);
                  },
                })
              }}> <TrashIcon className="w-6 h-6 stroke-red-700 hover:cursor-pointer" /> </Link>          
            </div>
          ),
        },
      ]
    
  return (
    <DataGrid
      dataSource={data}
      columns={columns}
      rowKey={(row) => row.seguimentoId}
      loading={isFetching}
    />
  )
}
