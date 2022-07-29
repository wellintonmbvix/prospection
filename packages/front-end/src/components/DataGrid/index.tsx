import * as React from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import {
  Table,
  Spinner,
  Pagination,
  PaginationProps,
} from "../../lib/components/";

import Skeleton from "../Skeleton";
import EmptyState, { EmptyStateProps } from "../EmptyState";

export type ColumnType<T = any> = {
  key: any;
  title: string;
  index?: string;
  render?: (row: T) => React.ReactNode | string;
  className?: string;
};

export type DataGridProps<T = any> = {
  columns: ColumnType<T>[];
  dataSource?: T[];
  rowKey?: ((row: T) => React.Key) | keyof T;
  pagination?: PaginationProps | undefined;
  emptyState?: EmptyStateProps | undefined;
  height?: number | string | undefined;
  header?: React.ReactNode;
  loading?: boolean;
  setstriped?: boolean;
  sethoverable?: boolean;
  skeletonSize?: number;
};

function DataGrid<T>({
  columns,
  dataSource,
  rowKey,
  pagination: paginationProps,
  emptyState: emptyStateProps,
  height,
  header,
  loading,
  setstriped = false,
  sethoverable = true,
  skeletonSize = 5,
}: DataGridProps<T>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getRowKey = (row: T, index: number): React.Key => {
    let key;

    if (typeof rowKey === "function") {
      key = rowKey(row);
    } else if (rowKey) {
      key = row[rowKey];
    } else {
      key = (row as any).key;
    }

    if (!key) {
      key = `table-row-${index}`;
    }

    return key;
  };

  return (
    <div className="divide-y">
      {header}
      <div className="w-full overflow-x-auto overflow-y-auto relative shadow-md sm:rounded-lg">
        <OverlayScrollbarsComponent
          options={{
            className: "os-theme-minimal-dark",
            paddingAbsolute: true,            
            scrollbars: {
              autoHide: "move",
            },
          }}
          className="React max-w-full"
          style={{
            height,
            maxHeight: height,
          }}
        >
          
          {mounted && (                      
            <Table striped={setstriped} hoverable={sethoverable}>
              <Table.Head>
                {columns?.length &&
                  columns.map((column) => (
                    <Table.HeadCell
                      scope="col"
                      className={column.className}
                      key={column.key}
                    >
                      {column.title}
                    </Table.HeadCell>
                  ))}
              </Table.Head>

              {dataSource && dataSource?.length > 0 && (
                <Table.Body  className="h-3.5">
                  {dataSource.map((row, index) => (
                    <Table.Row key={getRowKey(row, index)}>
                      {columns.map((column) => (
                        <Table.Cell key={column.key} className="py-3 px-6">
                          {column.index
                            ? (row as any)[column.index]
                            : column?.render && column?.render(row)}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}

                  {(dataSource === undefined || dataSource?.length <= 0) &&
                    loading &&
                    Array.from(new Array(skeletonSize).keys()).map((key) => (
                      <Table.Row key={key}>
                        {columns.map((column) => (
                          <Table.Cell key={column.key}>
                            <Skeleton
                              variant="text"
                              height={13}
                              width={column.title.length * 25}
                            />
                          </Table.Cell>
                        ))}
                      </Table.Row>
                    ))}
                </Table.Body>
              )}
            </Table>
          )}        
        </OverlayScrollbarsComponent>
        {mounted && dataSource && dataSource?.length > 0 && loading && (
          <div className="text-center">
            <Spinner aria-label="Default status example" size="xl" />
          </div>
        )}
      </div>
      {dataSource && dataSource?.length <= 0 && !loading && (
        <EmptyState {...emptyStateProps} />
      )}
      {dataSource && dataSource?.length > 0 && paginationProps && (
        <div className="flex justify-end p-2 m-4">
          <Pagination {...paginationProps} />
        </div>
      )}
    </div>
  );
}

export default DataGrid;
