export const defaultImage = "https://placehold.co/600x400/000/FFF?text=No+Image"

export function handleImageError(event: Event) {
  console.log("123")
  try {
    const target = event.target as HTMLImageElement
    target.src = defaultImage
  } catch (e) {
    console.error(`Couldn't handle image error for event: ${event}`)
    throw e
  }
}