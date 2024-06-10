import { ref } from "vue"
import { getAllAds } from "@/entities/Ad/model/api"

export function useAds() {
  const ads = ref<TAds>([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchAds() {
    loading.value = true

    getAllAds()
      .then((response) => {
        ads.value = response.data
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    ads,
    loading,
    error,
    fetchAds,
  }
}