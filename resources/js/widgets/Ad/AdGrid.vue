<script setup lang="ts">

import { AdCard, AdCardSkeleton } from "@/entities/Ad"
import { useAdStore } from "@/entities/Ad/model"
import { onMounted } from "vue"

const store = useAdStore()
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
    <AdCardSkeleton v-if="store.loading || store.error" v-for="n in 30" :key="n"/>
    <AdCard v-else v-for="ad in store.ads" :ad="ad" :key="ad.id"/>
  </div>
</template>

<style scoped>

</style>