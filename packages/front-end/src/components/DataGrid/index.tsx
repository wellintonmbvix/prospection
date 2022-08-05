import React, { useEffect } from "react";
import EmptyState, { EmptyStateProps } from "../EmptyState";
import Skeleton from "../Skeleton";
import Spinner from "../Spinner";

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
  loading?: boolean;
  skeletonSize?: number
  emptyState?: EmptyStateProps | undefined
};

export default function DataGrid<T>({
  columns,
  dataSource,
  rowKey,
  emptyState: emptyStateProps,
  height,
  header,
  loading,
  skeletonSize = 5
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
    <div className="overflow-x-auto relative">
      {mounted && (
        <table className="w-full text-sm text-left text-gray-500 bg-white dark:text-gray-400">
          <thead className="text-x text-gray-700 uppercase bg-gay-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns?.length &&
                columns.map((column) => (
                  <th scope="col" className={`py-3 px-6 ${column.className}`} key={column.key}>
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
                Array.from(new Array(skeletonSize).keys()).map(key => (
                    <tr key={key}>
                        {columns.map(column => (
                            <td key={column.key}>
                                <Skeleton />
                            </td>
                        ))}
                    </tr>
                ))
              }
            </tbody>
          )}
        </table>
      )}
      {mounted && dataSource && dataSource?.length > 0 && loading && (
        <div>
            <Spinner />
        </div>
      )}
      {dataSource && dataSource?.length <= 0 && !loading && (
        <EmptyState {...emptyStateProps}/>
      )}
    </div>
  );
}
