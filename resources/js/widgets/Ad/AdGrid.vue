<script setup lang="ts">

import { AdCard, AdCardSkeleton } from "@/entities/Ad"
import { useAdStore } from "@/entities/Ad/model"
import { onMounted } from "vue"
import ReloadIcon from "@/widgets/Ad/ReloadIcon.vue"

const store = useAdStore()
onMounted(() => {
  store.loadAds()
})

function handleReload() {
  store.loadAds()
  store.error = null
}
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
    <AdCardSkeleton v-if="store.loading || store.error" v-for="n in 30" :key="n"/>
    <AdCard v-else v-for="ad in store.ads" :ad="ad" :key="ad.id"/>
  </div>
  <div v-if="store.error"
       class="fixed top-0 left-0 z-50 flex flex-col justify-center items-center w-screen h-screen bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-200/60">
    <h6>Error Occurred :(</h6>
    <div class="bg-base-300 rounded-lg border border-neutral flex">
      <h1 class="ml-4 py-4 text-center text-3xl">{{ store.error }}</h1>
      <div class="w-16 ml-4 border-l border-neutral hover:bg-neutral cursor-pointer duration-300"
           @click.prevent="handleReload">
        <ReloadIcon class="w-full h-full p-3"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>