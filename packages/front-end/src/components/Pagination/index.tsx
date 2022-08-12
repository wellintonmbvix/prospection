import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

type PaginationItemProps = Omit<
  React.InputHTMLAttributes<HTMLButtonElement>,
  "size" | "prefix" | "type"
> & {
  active?: boolean;
  children: React.ReactNode;
};

function PaginationItem({
  className,
  active,
  children,
  ...buttonProps
}: PaginationItemProps) {
  return (
    <button
      className={`${
        className !== undefined ? `${className} ` : ""
      }h-8 w-8 border-primary rounded flex justify-center items-center ${
        active
          ? "bg-blue-700 text-white"
          : "text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
      }`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export type PaginationProps = {
  currentPage?: number;
  perPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
};

export default function Pagination({
  currentPage = 1,
  perPage,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const [pageNumber, setPageNumber] = React.useState(currentPage || 1);
  const [pageRange, setPageRange] = React.useState<Array<number>>([]);

  const getTotal = () => {
    if (
      perPage !== undefined &&
      perPage > 0 &&
      totalItems !== undefined &&
      totalItems > 0
    ) {
      return Math.ceil(totalItems / perPage);
    }

    return 0;
  };

  React.useEffect(() => {
    if (
      pageNumber > 0 &&
      perPage !== undefined &&
      perPage > 0 &&
      totalItems !== undefined &&
      totalItems > 0
    ) {
      const total = getTotal();

      if (total >= 8) {
        if (pageNumber <= 4) {
          setPageRange([2, 3, 4, 5, 6]);
        } else if (pageNumber < total - 4) {
          setPageRange([
            pageNumber - 2,
            pageNumber - 1,
            pageNumber,
            pageNumber + 1,
            pageNumber + 2,
          ]);
        } else {
          setPageRange([total - 5, total - 4, total - 3, total - 2, total - 1]);
        }
      } else {
        const pages = new Array<number>();

        for (let i = 2; i < total; i++) {
          pages.push(i);
        }

        setPageRange(pages);
      }
    }
  }, [pageNumber, perPage, totalItems]);

  React.useEffect(() => {
    pageNumber && onPageChange && onPageChange(pageNumber);
  }, [pageNumber]);

  return (
    <div className="flex items-center space-x-1">
      <PaginationItem
        onClick={() => setPageNumber((page) => (page > 1 ? page - 1 : page))}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </PaginationItem>
      <PaginationItem
        active={currentPage === 1}
        onClick={() => setPageNumber(1)}
      >
        1
      </PaginationItem>
      {pageNumber > 4 && getTotal() >= 8 && (
        <span className="text-gray-200">•••</span>
      )}
      {pageRange.map((page) => (
        <PaginationItem
          key={page}
          active={currentPage === page}
          onClick={() => setPageNumber(page)}
        >
          {page.toString()}
        </PaginationItem>
      ))}
      {pageNumber < getTotal() - 4 && <span className="text-gray-200">•••</span>}
      {getTotal() > 1 && (
        <PaginationItem
          active={currentPage === getTotal()}
          onClick={() => setPageNumber(getTotal())}
        >
          {Math.ceil(getTotal()).toString()}
        </PaginationItem>
      )}
      <PaginationItem
        onClick={() =>
          setPageNumber((page) =>
            page < Math.ceil(getTotal()) ? page + 1 : page
          )
        }
      >
        <ChevronRightIcon className="h-4 w-4" />
      </PaginationItem>
    </div>
  );
}
