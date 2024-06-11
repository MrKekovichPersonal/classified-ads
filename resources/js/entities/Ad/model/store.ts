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
    loadAds(
      page: number = 1,
      sortBy: "created_at" | "price" | null = null,
      order: "asc" | "desc" | null = null,
    ) {
      this.loading = true;
      getAds(page, sortBy, order)
        .then((response) => {
          this.ads = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.setError(error.message || "Unknown error occurred");
        });
    },

    addAd(ad: TCreateAdRq) {
      createAd(ad)
        .then((response) => {
          this.ads.push({
            id: response.data.id,
            main_photo: ad.images[0],
            title: ad.title,
            price: ad.price,
          });
        })
        .catch((error) => {
          this.setError(error.message || "Unknown error occurred");
        });
    },

    selectAd(id: number) {
      getAd(id, true, true)
        .then((response) => {
          this.selectedAd = response.data;
        })
        .catch((error) => {
          this.setError(error.message || "Unknown error occurred");
        });
    },

    resetSelectedAd() {
      this.selectedAd = null;
    },

    setError(message: string) {
      this.error = message;
    },

    setPage(page: number) {
      if (page === this.page) {
        return;
      }
      this.page = page;
      this.loadAds(page, this.sortBy, this.order);
    },

    setSortBy(sortBy: "created_at" | "price" | null) {
      if (sortBy === this.sortBy) {
        return;
      }
      this.sortBy = sortBy;
      this.loadAds(this.page, sortBy, this.order);
    },

    setOrder(order: "asc" | "desc" | null) {
      if (order === this.order) {
        return;
      }
      this.order = order;
      this.loadAds(this.page, this.sortBy, order);
    },
  },
});

