import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../../types";
import { ColumnType, DataGrid } from "../../components";
import { api } from "../../hooks/useApi";

export default function UsuarioListar() {
  const { data, isLoading } = useQuery(["usuarios"], async () => {
    const response = await api.get("/users");

    return response.data;
  });

  const columns: ColumnType<IUser>[] = [
    {
      key: "counter",
      title: "Código",
      className: "w-[10%]",
      render: (row) => (
        <div className="flex grid justify-items-center font-bold">
          {row.counter}
        </div>
      ),
    },
    {
      key: "name",
      title: "Nome de Usuário",
      index: "name",
      className: "w-[75%]",
    },
    {
      key: "acoes",
      title: "Ações",
      className: "w-[10%]",
      render: (row: IUser) => (
        <div className="flex items-center space-x-2 w-14">
          <Link to={`/users/editar?id=${row.counter}`}>
            <PencilAltIcon className="w-6 h-6 stroke-gray-700 dark:stroke-gray-50 hover:cursor-pointer" />
          </Link>
          <Link to="#" onClick={() => {}}>
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
      rowKey={(row) => row.counter}
      loading={isLoading}
    />
  );
}
