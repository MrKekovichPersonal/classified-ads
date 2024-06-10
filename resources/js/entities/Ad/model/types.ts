type TGetAllAdsRq = {
  page: number
  sortBy?: "price" | "created_at"
  order?: "asc" | "desc"
}

type TGetAllAdsRs = {
  title: string
  main_photo: string
  price: number
}[]
type TAds = TGetAllAdsRs

type TGetAdRq = {
  id: number
  description?: boolean
  images?: boolean
}

type TGetAdRs = {
  id: number
  title: string
  main_photo: string
  price: number
  description?: string
  images?: string[]
}
type TAd = TGetAdRs

type TCreateAdRq = {
  title: string
  description: string
  images: string[]
  price: number
}

type TCreateAdRs = {
  id: number
}
