import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Seguimento } from "../../types";
import { ColumnType, DataGrid, Dialog, Snackbar } from "../../components";
import { api } from "../../hooks/useApi";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const { useDialog } = Dialog;
const { useSnackbar } = Snackbar;

export default function SeguimentoListar() {
  const queryClient = useQueryClient();
  const dialog = useDialog();
  const snackbar = useSnackbar();

  const [pagina, setPagina] = useState(1);
  const [linhas, setLinhas] = useState(10);

  async function fetchProspeccoes(page: number, lines: number) {
    const { data } = await api.get(`/ratings?linhas=${lines}&pagina=${page}`);

    console.log(data?.totalRecords);

    return data;
  }

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["seguimentos", pagina, linhas],
    () => fetchProspeccoes(pagina, linhas),
    { keepPreviousData: true, staleTime: 5000 }
  );

  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(["seguimentos", pagina + 1], () =>
        fetchProspeccoes(pagina + 1, linhas)
      );
    }
  }, [data, pagina, queryClient]);

  const deleteSeguimento = async (id: string) => {
    const response = await api.delete(`/ratings/${id}`);

    return response.statusText;
  };

  const mutation = useMutation(deleteSeguimento, {
    onSuccess: () => {
      snackbar.success("Seguimento excluído com sucesso!");
      queryClient.invalidateQueries(["seguimentos"]);
    },
    onError: (error: AxiosError) => {
      snackbar.error(
        `Erro ao excluí seguimento. ${JSON.stringify(error.response?.data)}`
      );
    },
  });

  const columns: ColumnType<Seguimento>[] = [
    {
      key: "descricao",
      title: "Seguimento",
      index: "descricao",
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
          <Link
            to="#"
            onClick={() => {
              dialog.show({
                title: "Usuários",
                message: `Deseja realmente excluir o seguimento ${row.descricao}?`,
                okText: "Sim",
                cancelText: "Não",
                onOk: () => {
                  mutation.mutate(row.seguimentoId);
                },
              });
            }}
          >
            <TrashIcon className="w-6 h-6 stroke-red-700 hover:cursor-pointer" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataGrid
      dataSource={data?.ratings}
      columns={columns}
      rowKey={(row) => row.seguimentoId}
      loading={isFetching}
      pearPage={
        <div className="relative w-40">
          <select
            id="select_pearpage"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-500 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setLinhas(Number(e.target.value))}
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={30}>30 / page</option>
            <option value={40}>40 / page</option>
            <option value={50}>50 / page</option>
          </select>
          <label
            htmlFor="select_pearpage"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
          >
            Registros
          </label>
        </div>
      }
      pagination={{
        currentPage: pagina,
        perPage: linhas || 20,
        totalItems: data?.totalRecords,
        onPageChange: (pagina) => {
          setPagina(pagina);
        },
      }}
    />
  );
}
