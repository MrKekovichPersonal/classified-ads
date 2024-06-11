<script setup lang="ts">

import { AdCard, AdCardSkeleton } from "@/entities/Ad"
import { useAdStore } from "@/entities/Ad/model"
import { onMounted } from "vue"

const { ads, loadAds, loading, error } = useAdStore()
onMounted(() => {
  loadAds().then(()=>{
    console.log("123")
  })
})
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
    <AdCardSkeleton v-if="loading || error" v-for="n in 30" :key="n"/>
    <AdCard v-else v-for="ad in ads" :ad="ad" :key="ad.id"/>
  </div>
  <div v-if="error" class="fixed top-1/2 left-1/2 text-red-500 bg-gradient-to-br from-red-200 to-red-300 p-4 rounded">{{ error }}</div>
</template>

<style scoped>

</style>