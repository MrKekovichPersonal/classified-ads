import { defineStore } from "pinia"
import { TAd, TCreateAdRq } from "@/entities/Ad/model/types"
import { ref } from "vue"
import { createAd, getAd, getAds } from "@/entities/Ad/model/api"

const useAdStore = defineStore("ad", () => {
  const ads = ref<TAd[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const selectedAd = ref<TAd | null>(null)

  function loadAds(
    page: number = 1,
    sortBy: "created_at" | "price" | null = null,
    order: "asc" | "desc" | null = null,
  ) {
    loading.value = true
    getAds(page, sortBy, order)
      .then((response) => {
        ads.value = response.data
        loading.value = false
      })
      .catch((e) => error.value = e)
      .finally(() => loading.value = false)
  }

  function addAd(ad: TCreateAdRq) {
    createAd(ad)
      .then((response) => {
        ads.value.push({
          id: response.data.id,
          main_photo: ad.images[0],
          title: ad.title,
          price: ad.price,
        })
      })
      .catch((e) => error.value = e)
  }

  function selectAd(id: number) {
    getAd(id, true, true)
      .then((response) => {
        selectedAd.value = response.data
      })
      .catch((e) => error.value = e)
  }

  return {
    ads,
    loading,
    error,
    selectedAd,
    loadAds,
    addAd,
    selectAd
  }
})
