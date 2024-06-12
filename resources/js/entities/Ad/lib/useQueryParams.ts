import { Order, QueryParams, SortBy } from "@/entities/Ad"

export function getAdQueryParams(): QueryParams {
  const urlParams = new URLSearchParams(window.location.search);

  const page = urlParams.get("page");
  const sortBy = urlParams.get("sort_by");
  const order = urlParams.get("order");

  const isValidSortBy = (value: string | null): value is SortBy => {
    return value === "created_at" || value === "price" || value === null;
  };

  const isValidOrder = (value: string | null): value is Order => {
    return value === "asc" || value === "desc" || value === null;
  };

  return {
    page: page !== null && !isNaN(Number(page)) ? Number(page) : 1,
    sortBy: isValidSortBy(sortBy) ? (sortBy as SortBy) : "created_at",
    order: isValidOrder(order) ? (order as Order) : "asc",
  };
}

