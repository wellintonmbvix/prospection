import React, { useEffect, useState } from "react";
import { getUsersAll } from "../../store/users";
import { IUser } from "../../types";

export default function Users() {
  const [usuarios, setUsuarios ] = useState<IUser>({})

  useEffect(() => {
    getUsersAll()
      .then((response) => setUsuarios(response.data))
      .catch((err) => {
        console.error("Ops! Ocorreu um error " + err);
      })
  }, [])

  const columns = [
    {
      key: 'counter',
      title: 'Código',
      index: 'counter'
    },
    {
      key: 'name',
      title: 'Nome',
      index: 'name'
    },
    {
      key: 'accessusers',
      title: 'Acesso a Usuário',
      render: (row: IUser ) => (
        row.accessusers ? 'Sim' : 'Não'
      )
    },
    {
      key: 'accessclassific',
      title: 'Acesso a Classificação',
      render: (row: IUser ) => (
        row.accessclassific ? 'Sim' : 'Não'
      )
    },
    {
      key: 'accessprospect',
      title: 'Acesso a Prospecção',
      render: (row: IUser ) => (
        row.accessprospect ? 'Sim' : 'Não'
      )
    }
  ]

  return (    
    <div className="relative h-full flex flex-nowrap grid justify-items-center flex items-center bg-gray-100">
      <p className="font-semibold text-4xl dark:text-white">Usuários</p>
    </div>
  );
}
