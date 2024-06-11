export type TAd = {
  id: number
  title: string
  main_photo: string
  price: number
  description?: string
  images?: string[]
}

export type TCreateAdRq = {
  title: string
  description: string
  images: string[]
  price: number
}

export type SortBy = "created_at" | "price" | null | string
export type Order = "asc" | "desc" | null | string
export type QueryParams = {
  page: number | null
  sortBy: SortBy
  order: Order
}