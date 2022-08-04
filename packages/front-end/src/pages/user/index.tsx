import React, { useEffect, useState } from "react";
import { getUsersAll } from "../../store/users";
import { IUser } from "../../types";

export default function Users() {
  const [usuarios, setUsuarios] = useState<IUser[]>();

  useEffect(() => {
    getUsersAll()
      .then((response) => {
        setUsuarios(response.data)

      })
      .catch((err) => {
        console.error("Ops! Ocorreu um error " + err);
      });
  }, []);

  const columns = [
    {
      key: "counter",
      title: "Código",
      index: "counter",
    },
    {
      key: "name",
      title: "Nome",
      index: "name",
    },
    {
      key: "accessusers",
      title: "Acesso a Usuário",
      render: (row: IUser) => (row.accessusers ? "Sim" : "Não"),
    },
    {
      key: "accessclassific",
      title: "Acesso a Classificação",
      render: (row: IUser) => (row.accessclassific ? "Sim" : "Não"),
    },
    {
      key: "accessprospect",
      title: "Acesso a Prospecção",
      render: (row: IUser) => (row.accessprospect ? "Sim" : "Não"),
    },
  ];

  return (
    <div className="relative h-full flex flex-nowrap grid justify-items-center flex items-center bg-gray-100 dark:bg-gray-600">
      <div className="w-3/5 grid grid-cols-1 divide-y">
        <div className="mb-0.5">
          <p className="font-semibold text-4xl dark:text-white">Usuários</p>
        </div>
        <div />
        <div className="overflow-x-auto mt-4 p-2 bg-gray-200 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <table className="table-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-x text-gray-700 uppercase bg-gay-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {columns.map((column) => (
                  <th key={column.index} scope="col" className="py-3 px-6">
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usuarios?.map((usuario) => (
                <tr className="bg-whit border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                  <th key={usuario.counter} className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {usuario.counter}
                  </th>
                  <th className="py-4 px-6">
                    {usuario.name}
                  </th>
                  <th className="py-4 px-6">
                    {usuario.accessusers}
                  </th>
                  <th className="py-4 px-6">
                    {usuario.accessclassific}
                  </th>
                  <th className="py-4 px-6">
                    {usuario.accessprospect}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
