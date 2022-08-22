import React, { useEffect } from "react";
import EmptyState, { EmptyStateProps } from "../EmptyState";
import Pagination, { PaginationProps } from "../Pagination";
import Skeleton from "../Skeleton";
import Spinner from "../Spinner";
import SimpleBar from "simplebar-react";

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
  height?: number | string | undefined;
  header?: React.ReactNode;
  pearPage?: React.ReactNode;
  loading?: boolean;
  skeletonSize?: number;
  pagination?: PaginationProps | undefined;
  emptyState?: EmptyStateProps | undefined;
};

export default function DataGrid<T>({
  columns,
  dataSource,
  rowKey,
  pagination: paginationProps,
  emptyState: emptyStateProps,
  height,
  header,
  pearPage,
  loading,
  skeletonSize = 5,
}: DataGridProps<T>) {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  });

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
    <>
      <div className="overflow-x-auto relative">
        <SimpleBar style={{ maxHeight: 388 }}>
          {mounted && (
            <table className="w-full text-sm text-left text-gray-500 bg-white dark:text-gray-400 z-0 table-auto">
              <thead className="text-x bg-gray-200 text-gray-400 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {columns?.length &&
                    columns.map((column) => (
                      <th
                        scope="col"
                        className={`py-3 px-6 ${column.className}`}
                        key={column.key}
                      >
                        {column.title}
                      </th>
                    ))}
                </tr>
              </thead>
              {dataSource && dataSource?.length > 0 && (
                <tbody>
                  {dataSource.map((row, index) => (
                    <tr
                      key={getRowKey(row, index)}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-300"
                    >
                      {columns.map((column) => (
                        <td key={column.key} className="py-2 px-6">
                          {column.index
                            ? (row as any)[column.index]
                            : column?.render && column?.render(row)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {(dataSource === undefined || dataSource?.length <= 0) &&
                    loading &&
                    Array.from(new Array(skeletonSize).keys()).map((key) => (
                      <tr key={key}>
                        {columns.map((column) => (
                          <td key={column.key}>
                            <Skeleton />
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          )}
        </SimpleBar>
        {mounted && dataSource && dataSource?.length > 0 && loading && (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center backdrop-blur-xl backdrop-brightness-50 backdrop-opacity-40">
            <Spinner />
          </div>
        )}
        {dataSource && dataSource?.length <= 0 && !loading && (
          <EmptyState {...emptyStateProps} />
        )}
        {dataSource && dataSource?.length > 0 && paginationProps && (
          <div className="flex justify-end p-2 gap-2 mt-2">
            {pearPage} <Pagination {...paginationProps} />
          </div>
        )}
      </div>
    </>
  );
}
