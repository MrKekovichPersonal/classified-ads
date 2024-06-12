<script setup lang="ts">

import { Navbar } from "@/shared/ui"
import { AdGrid } from "@/widgets/Ad"

import { useAdStore } from "@/entities/Ad/model"
import { onMounted } from "vue"
import { getAdQueryParams } from "@/entities/Ad"
import { Error } from "@/shared/ui"
import { AdActions } from "@/widgets/Ad"
import { AdDetails } from "@/widgets/Ad"

const store = useAdStore()

onMounted(() => {
  const { page, sortBy, order } = getAdQueryParams()
  store.loadAds(page, sortBy, order)
})
</script>

<template>
  <Navbar/>

  <div class="container mx-auto my-2">
    <AdGrid/>
    <AdActions v-if="!store.loading && !store.error"/>
  </div>

  <AdDetails/>

  <Error v-if="store.error" :error-message="store.error"/>
</template>
