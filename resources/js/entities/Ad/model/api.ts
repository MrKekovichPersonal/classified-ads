import { api } from "@/shared/api/instance"
import { PaginatedRs } from "@/shared/types"
import { QueryParams, TAd, TCreateAdRq, TDetailedAd } from "@/entities/Ad/model/types"

export async function getAds(
  { page, sortBy, order }: QueryParams,
): Promise<PaginatedRs<TAd[]>> {
  const response = await api.get("/ads", {
    params: {
      page,
      sort_by: sortBy,
      order,
    },
  })

  return response.data
}

export async function getAd(
  id: number,
  description: boolean = false,
  images: boolean = false,
): Promise<TDetailedAd> {
  const fields: string[] = []
  if (description) {
    fields.push("description")
  }
  if (images) {
    fields.push("images")
  }

  const response = await api.get(`/ads/${id}`, {
    params: {
      fields: fields.join(","),
    },
  })

  return response.data
}

export async function createAd(ad: TCreateAdRq): Promise<{ id: number }> {
  const response = await api.post("/ads", ad)
  return response.data
}
