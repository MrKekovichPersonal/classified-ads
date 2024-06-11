import { Order, QueryParams, SortBy } from "@/entities/Ad"

export function getAdQueryParams(): QueryParams {
  const urlParams = new URLSearchParams(window.location.search)
  return {
    page: Number(urlParams.get("page")) || null,
    sortBy: urlParams.get("sortBy") as SortBy,
    order: urlParams.get("order") as Order,
  }
}

