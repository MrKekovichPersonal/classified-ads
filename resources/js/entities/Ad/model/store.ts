import { defineStore } from "pinia"
import { TAd, TCreateAdRq } from "@/entities/Ad/model/types"
import { ref } from "vue"
import { createAd, getAd, getAds } from "@/entities/Ad/model/api"

const useAdStore = defineStore({
  id: "ad",
  state: () => ({
    ads: [] as TAd[],
    loading: true,
    error: null as string | null,
    selectedAd: null as TAd | null
  }),
  actions: {
    async loadAds(
      page: number = 1,
      sortBy: "created_at" | "price" | null = null,
      order: "asc" | "desc" | null = null
    ) {
      this.loading = true;
      try {
        const response = await getAds(page, sortBy, order);
        this.ads = response.data;
      } catch (error) {
        this.setError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        this.loading = false;
      }
    },
    async addAd(ad: TCreateAdRq) {
      try {
        const response = await createAd(ad);
        this.ads.push({
          id: response.data.id,
          main_photo: ad.images[0],
          title: ad.title,
          price: ad.price
        });
      } catch (error) {
        this.setError(error instanceof Error ? error.message : "Unknown error occurred");
      }
    },
    async selectAd(id: number) {
      try {
        const response = await getAd(id, true, true);
        this.selectedAd = response.data;
      } catch (error) {
        this.setError(error instanceof Error ? error.message : "Unknown error occurred");
      }
    },
    async resetSelectedAd() {
      this.selectedAd = null;
    },
    setError(message: string) {
      this.error = message;
    }
  }
})
