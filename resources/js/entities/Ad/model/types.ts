export type TAd = {
  id: number
  title: string
  main_image: string
  price: number
}

export type TDetailedAd = TAd & {
  description?: string
  images: string[]
}

export type TCreateAdRq = {
  title: string
  description: string
  images: string[]
  price: number
}

export type SortBy = "created_at" | "price" | null
export type Order = "asc" | "desc" | null
export type QueryParams = {
  page: number
  sortBy: SortBy
  order: Order
}