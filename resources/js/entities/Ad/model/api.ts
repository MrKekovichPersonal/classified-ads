import { api } from "@/shared/api/instance"
import { BackendRs } from "@/app/types"


export async function getAllAds({ page, sortBy, order }: TGetAllAdsRq = { page: 1 }): Promise<BackendRs<TGetAllAdsRs>> {
  const response = await api.get("/ads", {
    params: {
      page,
      sortBy,
      order,
    },
  })

  return response.data
}

export async function getAd({ id, description, images }: TGetAdRq): Promise<BackendRs<TGetAdRs>> {
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

export async function createAd(ad: TCreateAdRq): Promise<BackendRs<TCreateAdRs>> {
  const response = await api.post("/ads", ad)
  return response.data
}
