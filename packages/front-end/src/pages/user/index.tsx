import { Link, useNavigate } from "react-router-dom";
import { ColumnType } from "../../components/";
import { IUser } from "../../types/index";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import Users from "../../components/templates/Usuarios";
import { GetUsersAll } from "../../store/users";

export default function Page() {
  const navigate = useNavigate();
  const { data, error, isLoading, isFetching } = GetUsersAll();

  const columns: ColumnType[] = [
    {
      key: "counter",
      title: "Código",
      className: "w-[10%]",
      render:(row: IUser) => (
        <div className="flex grid justify-items-center font-bold">
          {row.counter}
        </div>
      )
    },
    {
      key: "name",
      title: "Nome",
      index: "name",
      className: "w-[75%]",
    },
    {
      key: "actions",
      title: "Ações",
      className: "w-[10%]",
      render: (row: IUser) => (
        <div className="flex items-center space-x-2 w-14">   
          <Link to={`/users/editar?id=${row.counter}`}><PencilAltIcon className="w-6 h-6 stroke-gray-700 dark:stroke-gray-50 hover:cursor-pointer" /></Link>
          <Link to="#" onClick={() => {}}><TrashIcon className="w-6 h-6 stroke-red-700 hover:cursor-pointer" /></Link>          
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex items-center grid justify-items-center">
      <div className="w-1/2">
        <Users
          title="Usuários"
          columns={columns}
          dataSource={data}
          loading={isLoading}
          onNew={() => {navigate("/users/novo")}}
          rowKey={(row: IUser) => row.counter}
        />
      </div>
    </div>
  );
}
