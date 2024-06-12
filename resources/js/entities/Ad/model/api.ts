import { api } from "@/shared/api/instance"
import { BackendRs } from "@/shared/types"
import { QueryParams, TAd, TCreateAdRq } from "@/entities/Ad/model/types"

export async function getAds(
  { page, sortBy, order }: QueryParams,
): Promise<BackendRs<TAd[]>> {
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
): Promise<BackendRs<TAd>> {
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

export async function createAd(ad: TCreateAdRq): Promise<BackendRs<{ id: number }>> {
  const response = await api.post("/ads", ad)
  return response.data
}
