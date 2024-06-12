<script setup lang="ts">

import { AdCard, AdCardSkeleton } from "@/entities/Ad"
import { useAdStore } from "@/entities/Ad/model"

const store = useAdStore()
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5  gap-4">
    <AdCardSkeleton v-if="store.loading || store.error" v-for="n in 10" :key="n"/>
    <AdCard v-else v-for="ad in store.ads" :ad="ad" :key="ad.id" @click="store.selectAd(ad.id)"/>
  </div>
</template>

<style scoped>

</style>