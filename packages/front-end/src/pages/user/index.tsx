import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ColumnType } from "../../components/";
import { IUser } from "../../types/index";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import Users from "../../components/templates/Usuarios";
import { getUsersAll } from "../../store/users";

export default function Page() {
  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsersAll()
      .then((response) => setUsuarios(response.data))
      .catch();
  }, []);

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
      className: "w-[70%]",
    },
    {
      key: "actions",
      title: "Ações",
      className: "w-[15%]",
      render: (row: IUser) => (
        <div className="flex items-center space-x-1">
          <Button
            icon={PencilAltIcon}
            onClick={() => navigate(`/user/editar?id=${row.counter}`)}
            color="warning"
          />
          <Button icon={TrashIcon} onClick={() => {}} color="danger" />
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
          dataSource={usuarios}
          rowKey={(row: IUser) => row.counter}
        />
      </div>
    </div>
  );
}
