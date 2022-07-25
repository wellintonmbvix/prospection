import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";
import { Tooltip } from "flowbite-react";
import { ColumnType } from "../../components/DataGrid";

import { Classification } from "../../types";
import Classifications from "../../templates/Classification";

export default function Page() {
  const [page, setPage] = useState(1);

  const data = [
    {
      counter: 1,
      description: "CONTADORES",
    },
    {
      counter: 2,
      description: "AUTO PEÇAS",
    },
    {
      counter: 3,
      description: "AUTO PEÇAS",
    },
    {
      counter: 4,
      description: "AUTO PEÇAS",
    },
    {
      counter: 5,
      description: "AUTO PEÇAS",
    },
    {
      counter: 6,
      description: "AUTO PEÇAS",
    },
  ];

  const navigate = useNavigate();

  const columns: ColumnType[] = [
    {
      key: "counter",
      title: "Código",
      className:" w-[5%]",
      render: (row: Classification) => (
        <div style={{ textAlign: 'center'}}>
          {row.counter}
        </div>
      )
    },
    {
      key: "description",
      title: "Nome",
      index: "description",
      className:" w-[80%]",
    },
    {
      key: "actions",
      title: "Ações",
      className:" w-[5%]",
      render: (row: Classification) => (
        <div className="flex flex-row space-x-4">
          <Tooltip
            content="Editar registro"
            animation="duration-300"
          >
          <HiPencil
            className="flex-none hover:scale-125 w-5 h-5 cursor-pointer"
            onClick={() => navigate(`/classification/editar?id=${row.counter}`)}
          />
          </Tooltip>
          <Tooltip
            content="Excluir registro"
            animation="duration-300"
          >
          <HiTrash
            className="flex-none hover:scale-125 w-5 h-5 cursor-pointer"
            onClick={() => {}}
          />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Classifications
        title="Classificações"
        columns={columns}
        dataSource={data}
        setstriped={true}
        loading
        pagination={{
          showIcons: true,
          currentPage: page,
          layout: "pagination",
          totalPages: 2,
          onPageChange: page => {
            setPage(page)
          }
        }}
        rowKey={(row: Classification) => row.counter}
        onNew={() => navigate("/classification/novo")}
      />
    </>
  );
}
