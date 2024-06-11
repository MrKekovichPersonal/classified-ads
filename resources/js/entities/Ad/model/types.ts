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
