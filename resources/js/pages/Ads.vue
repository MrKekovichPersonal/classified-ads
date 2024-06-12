<script setup lang="ts">

import Navbar from "@/shared/ui/Navbar.vue"
import AdGrid from "@/widgets/Ad/AdGrid.vue"

import { useAdStore } from "@/entities/Ad/model"
import { onMounted } from "vue"
import { getAdQueryParams } from "@/entities/Ad"
import Error from "@/shared/ui/Error.vue"
import AdActions from "@/widgets/Ad/AdActions.vue"
import AdDetails from "@/widgets/Ad/AdDetails.vue"

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
