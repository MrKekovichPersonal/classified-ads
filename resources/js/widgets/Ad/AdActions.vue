<script setup lang="ts">
import { blurFilter } from "@/shared/lib/blurFilter"
import AdModal from "@/widgets/Ad/AdModal.vue"
import { computed, onMounted, ref } from "vue"
import { getAdQueryParams, useAdStore } from "@/entities/Ad"
import { ArrowIcon, PlusIcon } from "@/shared/ui/icons"

const modalOpen = ref(false)
const page = ref<number>(1)
const selectedPage = ref<number>(1)
const store = useAdStore()

const previousPage = computed(() => page.value === 1
  ? 1
  : page.value - 1,
)
const nextPage = computed(() => page.value + 1)

onMounted(() => {
  const currentPage = getAdQueryParams().page || 1
  page.value = currentPage
  selectedPage.value = currentPage
})

function openModal() {
  modalOpen.value = true
}

function onModalConfirm() {
  modalOpen.value = false
}

function onModalClose() {
  modalOpen.value = false
}

function onSelectPage(event: Event) {
  window.location.href = `?page=${selectedPage.value}`
}

</script>

<template>
  <div
    class="w-full px-8 my-4 sticky bottom-6 z-50 space-y-2">
    <form class="flex justify-center items-center " @submit.prevent="onSelectPage">
      <h1 class="text-sm">Current page:</h1>
      <input class="input ml-1 w-10 h-8 border border-neutral rounded-r-none shadow-md shadow-base-300" type="number" v-model="selectedPage" min="1">
      <button type="submit" class="w-10 h-8 rounded-l-none rounded-r-lg bg-primary text-white rounded">Go</button>
    </form>
    <div class="grid grid-cols-[50px,1fr,50px] rounded-lg overflow-hidden shadow-md shadow-base-300">
      <a
        :href="`?page=${previousPage}`"
        class="flex justify-center items-center hover:bg-base-300 h-12 duration-300"
        :class="blurFilter('bg-neutral/60')">
        <ArrowIcon class="h-full " direction="left"/>
      </a>
      <AdModal
        v-if="!store.loading && !store.error"
        :show="modalOpen"
        @confirm="onModalConfirm"
        @close="onModalClose">
        <div
          @click="openModal"
          class="flex justify-center items-center hover:bg-base-300 h-12 border-x-2 border-base-100 duration-300"
          :class="blurFilter('bg-neutral/60')">
          <PlusIcon class="h-full"/>
        </div>
      </AdModal>
      <a
        :href="`?page=${nextPage}`"
        class="flex justify-center items-center hover:bg-base-300 h-12 duration-300"
        :class="blurFilter('bg-neutral/60')">
        <ArrowIcon class="h-full"/>
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>