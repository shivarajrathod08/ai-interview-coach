import { useMemo, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../constants/appConstants";

export const usePagination = (items = [], pageSize = DEFAULT_PAGE_SIZE) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const goToPage = (nextPage) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  const nextPage = () => goToPage(page + 1);
  const previousPage = () => goToPage(page - 1);

  return {
    page,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    previousPage,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
};
