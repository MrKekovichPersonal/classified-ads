<script setup lang="ts">

import Navbar from "@/shared/ui/Navbar.vue"
import AdList from "@/widgets/Ad/AdGrid.vue"
import ReloadIcon from "@/widgets/Ad/ReloadIcon.vue"

import { useAdStore } from "@/entities/Ad/model"

const store = useAdStore()


let reloadCount = 0
function handleReload() {
  store.loadAds()
  store.error = null
  reloadCount++

  if (reloadCount >= 3) {
    window.location.reload()
  }
}
</script>

<template>
  <Navbar/>
  <div class="container mx-auto my-2">
    <AdList/>
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
