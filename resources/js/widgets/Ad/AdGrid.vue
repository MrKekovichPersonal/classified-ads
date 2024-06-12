<script setup lang="ts">

import { AdCard, AdCardSkeleton } from "@/entities/Ad"
import { useAdStore } from "@/entities/Ad/model"
import RoundPlusIcon from "@/shared/ui/PlusIcon.vue"
import { ref } from "vue"
import AdModal from "@/widgets/Ad/AdModal.vue"

const store = useAdStore()
const modalOpen = ref(false)

function openModal() {
  modalOpen.value = true
}

function onModalConfirm() {
  modalOpen.value = false
}

function onModalClose() {
  modalOpen.value = false
}
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
    <AdCardSkeleton v-if="store.loading || store.error" v-for="n in 12" :key="n"/>
    <AdCard v-else v-for="ad in store.ads" :ad="ad" :key="ad.id"/>
  </div>
  <AdModal
    v-if="!store.loading && !store.error"
    :show="modalOpen"
    @confirm="onModalConfirm"
    @close="onModalClose">
    <div
      @click="openModal"
      class="w-full h-12 p-2 mx-8 my-4 flex justify-center items-center sticky bottom-6 z-50 border border-neutral rounded-lg shadow-md backdrop-blur supports-[backdrop-filter]:bg-neutral/60 hover:bg-base-300/95 cursor-pointer duration-300">
      <RoundPlusIcon class="h-full"/>
    </div>
  </AdModal>
</template>

<style scoped>

</style>