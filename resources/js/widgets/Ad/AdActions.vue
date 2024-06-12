<script setup lang="ts">
import { bgBlurFilter } from "@/shared/lib/bgBlurFilter"
import { CreateAdModalForm } from "@/widgets/Ad"
import { computed, onMounted, ref } from "vue"
import { getAdQueryParams, Order, SortBy, useAdStore } from "@/entities/Ad"
import { ArrowIcon, PlusIcon } from "@/shared/ui/icons"
import { generateUrlQueryParams } from "@/shared/lib/generateUrlQueryParams"

const modalOpen = ref(false)
const page = ref<number>(1)
const selectedPage = ref<number>(1)
const store = useAdStore()

const sortBy = ref<SortBy>("created_at")
const order = ref<Order>("asc")

const previousPage = computed(() => page.value <= 1 ? 1 : page.value - 1)
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

function onSelectPage() {
  window.location.replace(generateUrl(selectedPage.value))
}

function generateUrl(page: number): string {
  return generateUrlQueryParams({ page, sort_by: sortBy.value, order: order.value })
}

onMounted(() => {
  const urlParams = getAdQueryParams()
  sortBy.value = urlParams.sortBy
  order.value = urlParams.order
  console.log(urlParams)
})
</script>

<template>
  <div class="w-full px-8 my-4 sticky bottom-6 z-50 space-y-2">

    <form class="flex justify-center items-center " @submit.prevent="onSelectPage">
      <div class="flex items-center space-x-4">
        <div>
          <label for="sortBy" class="text-sm">Sort by:</label>
          <select id="sortBy" v-model="sortBy" class="select select-bordered ml-1 w-32 h-8 shadow-md shadow-base-300">
            <option :selected="sortBy === 'created_at'" value="created_at">Created At</option>
            <option :selected="sortBy === 'price'" value="price">Price</option>
          </select>
        </div>
        <div>
          <label for="order" class="text-sm">Order:</label>
          <select id="order" v-model="order" class="select select-bordered ml-1 w-24 h-8 shadow-md shadow-base-300">
            <option :selected="order === 'asc'" value="asc">Asc</option>
            <option :selected="order === 'desc'" value="desc">Desc</option>
          </select>
        </div>
        <div class="flex items-center">
          <label for="currentPage" class="text-sm">Current page:</label>
          <input id="currentPage" class="input ml-1 w-16 border border-neutral shadow-md shadow-base-300" type="number"
                 v-model="selectedPage" min="1">
          <button type="submit" class="btn ml-1 rounded-lg bg-primary text-white">Go</button>
        </div>
      </div>
    </form>

    <div class="grid grid-cols-[50px,1fr,50px] rounded-lg overflow-hidden shadow-md shadow-base-300">
      <a
        :href="generateUrl(previousPage)"
        class="flex justify-center items-center bg-neutral/60 hover:bg-base-300/80 h-12 duration-300"
        :class="bgBlurFilter()">
        <ArrowIcon class="h-full " direction="left"/>
      </a>

      <CreateAdModalForm
        v-if="!store.loading && !store.error"
        :show="modalOpen"
        @confirm="onModalConfirm"
        @close="onModalClose">
        <div
          @click="openModal"
          class="flex justify-center items-center bg-neutral/60 hover:bg-base-300/80 h-12 border-x-2 border-base-100 duration-300 cursor-pointer"
          :class="bgBlurFilter('bg-neutral/60')">
          <PlusIcon class="h-full"/>
        </div>
      </CreateAdModalForm>

      <a
        :href="generateUrl(nextPage)"
        class="flex justify-center items-center bg-neutral/60 hover:bg-base-300/80 h-12 duration-300"
        :class="bgBlurFilter('bg-neutral/60')">
        <ArrowIcon class="h-full"/>
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>
