import React from "react";
import { Card, Button } from "../../lib";
import { DataGrid, DataGridProps, PageHeader } from "../../components";
import { HiPlusCircle } from "react-icons/hi";

type ClassificationsProps = DataGridProps & {
  title: string;
  onNew?: () => void;
};

function Classifications({
  title,
  onNew,
  ...dataGridProps
}: ClassificationsProps) {
  return (
    <div className="flex flex-col m-4 md:m-8">
      <PageHeader
        title={title}
        actions={
          <Button size="xs" color="light" onClick={onNew} >
            <div className="flex flex-row items-center space-x-4 font:medium">
            <HiPlusCircle className="w-5 h-5" />
            Novo
            </div>
          </Button>
        }
      />
      <Card>
        <DataGrid {...dataGridProps} />
      </Card>
    </div>
  );
}

export default Classifications;
