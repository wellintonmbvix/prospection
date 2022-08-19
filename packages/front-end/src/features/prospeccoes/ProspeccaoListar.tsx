import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnType, DataGrid, Dialog, Snackbar } from "../../components";
import { api } from "../../hooks/useApi";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Prospeccao } from "../../types/prospeccao";

const { useDialog } = Dialog;
const { useSnackbar } = Snackbar;

export default function ProspeccaoListar() {
  const queryClient = useQueryClient();
  const dialog = useDialog();
  const snackbar = useSnackbar();

  const [pagina, setPagina] = useState(1);
  const [linhas, setLinhas] = useState(20);

  async function fetchProspeccoes(page: number, lines: number) {
    const { data } = await api.get(`/prospects?linhas=${lines}&pagina=${page}`);

    return data?.prospects;
  }

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["prospeccoes", pagina, linhas],
    () => fetchProspeccoes(pagina, linhas),
    { keepPreviousData: true, staleTime: 5000 }
  );

  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(["prospeccoes", pagina + 1], () =>
        fetchProspeccoes(pagina + 1, linhas)
      );
    }
  }, [data, pagina, queryClient]);

  const deleteProspeccao = async (id: string) => {
    const response = await api.delete(`/prospects/${id}`);

    return response.statusText;
  }

  const mutation = useMutation(deleteProspeccao, {
    onSuccess: () => {
      snackbar.success("Prospecção excluída com sucesso!");
      queryClient.invalidateQueries(['prospeccoes']);
    },
    onError: (error: AxiosError) => {
      snackbar.error(`Erro ao excluí prospecção. ${JSON.stringify(error.response?.data)}`);
    }
  })

  const columns: ColumnType<Prospeccao>[] = [
    {
      key: "nomeEmpresa",
      title: "Empresa",
      index: "nomeEmpresa",
    },
    {
      key: "seguimento.descricao",
      title: "Seguimento",
      render: (row) => (
        row.seguimento.descricao.toLocaleUpperCase()
      )
    },
    {
      key: "nomeSistema",
      title: "Sistema",
      index: "nomeSistema",
    },
    {
        key: "cidade",
        title: "Cidade",
        index: "cidade"
    },
    {
      key: "ativo",
      title: "Ativo",
      render: (row) => (
        <div className="text-center">{row.ativo === true ? "Sim" : "Não"}</div>
      ),
    },
    {
      key: "acoes",
      title: "Ações",
      className: "w-[10%]",
      render: (row) => (
        <div className="flex items-center space-x-2 w-14">
          <Link to={`/prospects/editar?id=${row.prospeccaoId}`}>
            <PencilAltIcon className="w-6 h-6 stroke-gray-700 dark:stroke-gray-50 hover:cursor-pointer" />
          </Link>
          <Link
            to="#"
            onClick={() => {
              dialog.show({
                title: "Usuários",
                message: `Deseja realmente excluir a prospecção da empresa ${row.nomeEmpresa}?`,
                okText: "Sim",
                cancelText: "Não",
                onOk: () => {
                  mutation.mutate(row.prospeccaoId);
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
      dataSource={data}
      columns={columns}
      rowKey={(row) => row.prospeccaoId}
      loading={isFetching}
      pagination={{
        currentPage: pagina,
        perPage: linhas,
        totalItems: data?.totalRecords,
        onPageChange: pagina => {
            setPagina(pagina)
        }
      }}
    />
  );
}
