import { defineStore } from "pinia"
import { TAd, TCreateAdRq } from "@/entities/Ad/model/types"
import { createAd, getAd, getAds } from "@/entities/Ad/model/api"

export const useAdStore = defineStore({
  id: "ad",
  state: () => ({
    ads: [] as TAd[],
    page: 1,
    sortBy: null as "created_at" | "price" | null,
    order: null as "asc" | "desc" | null,
    loading: true,
    error: null as string | null,
    selectedAd: null as TAd | null,
  }),
  actions: {
    async loadAds(
      page: number = 1,
      sortBy: "created_at" | "price" | null = null,
      order: "asc" | "desc" | null = null,
    ) {
      this.loading = true
      try {
        const response = await getAds(page, sortBy, order)
        this.ads = response.data
        this.loading = false
      } catch (error) {
        this.setError(error instanceof Error ? error.message : "Unknown error occurred")
      }
    },

    async addAd(ad: TCreateAdRq) {
      try {
        const response = await createAd(ad)
        this.ads.push({
          id: response.data.id,
          main_photo: ad.images[0],
          title: ad.title,
          price: ad.price,
        })
      } catch (error) {
        this.setError(error instanceof Error ? error.message : "Unknown error occurred")
      }
    },

    async selectAd(id: number) {
      try {
        const response = await getAd(id, true, true)
        this.selectedAd = response.data
      } catch (error) {
        this.setError(error instanceof Error ? error.message : "Unknown error occurred")
      }
    },

    async resetSelectedAd() {
      this.selectedAd = null
    },

    setError(message: string) {
      this.error = message
    },

    async setPage(page: number) {
      if (page === this.page) {
        return
      }
      this.page = page
      await this.loadAds(page, this.sortBy, this.order)
    },

    async setSortBy(sortBy: "created_at" | "price" | null) {
      if (sortBy === this.sortBy) {
        return
      }
      this.sortBy = sortBy
      await this.loadAds(this.page, sortBy, this.order)
    },

    async setOrder(order: "asc" | "desc" | null) {
      if (order === this.order) {
        return
      }
      this.order = order
      await this.loadAds(this.page, this.sortBy, order)
    },
  },
})
