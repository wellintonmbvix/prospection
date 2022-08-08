import React from "react";
import { Button, Card, DataGrid, DataGridProps, PageHeader } from "../../";
import { PlusSmIcon } from "@heroicons/react/solid";

type UsuarioProps = DataGridProps & {
  title: string;
  onNew?: () => void;
};

export default function Usuarios({
  title,
  onNew,
  ...dataGridProps
}: UsuarioProps) {
  return (
    <div>
      <PageHeader
        title={title}
        actions={
          <Button icon={PlusSmIcon} onClick={onNew} color="primary">
            Novo
          </Button>
        }
      />
      <Card elevation="md">
        <DataGrid {...dataGridProps} />
      </Card>
    </div>
  );
}
