import { api } from "@/shared/api/instance"
import { BackendRs } from "@/app/types"
import { TAd, TCreateAdRq } from "@/entities/Ad/model/types"

export async function getAllAds(
  page: number = 1,
  sortBy: "created_at" | "price" | null = null,
  order: "asc" | "desc" | null = null,
): Promise<BackendRs<TAd>> {
  const response = await api.get("/ads", {
    params: {
      page,
      sortBy,
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