<script setup lang="ts">
import Modal from "@/shared/ui/Modal.vue"
import { useAdStore } from "@/entities/Ad"
import { computed, onMounted, ref } from "vue"
import { storeToRefs } from "pinia"

const { selectedAd } = storeToRefs(useAdStore())
const { resetSelectedAd } = useAdStore()

const thumbnailIndex = ref(0)
const thumbnail = computed(() => selectedAd.value?.images[thumbnailIndex.value])

</script>

<template>
  <Modal :show="selectedAd !== null">
    <div class="modal-box p-2 flex flex-col justify-center items-center]">
      <div v-if="selectedAd !== null">
        <div class="grid grid-rows-3 grid-cols-3 gap-2 w-full h-[400px]">

          <div class="row-span-2 col-span-3 overflow-hidden rounded-lg ">
            <a :href="thumbnail">
              <img :src="thumbnail" alt="Main Image" class="w-full h-full object-cover hover:scale-105 duration-300"/>
            </a>
          </div>

          <div v-for="(image, index) in selectedAd.images" :key="index"
               class="flex items-center justify-center overflow-hidden rounded-lg"
               :class="thumbnailIndex == index ? 'border-2 border-primary' : ''">
            <img
              :src="image"
              alt="Thumbnail Image" class="w-full h-full object-cover cursor-pointer hover:scale-105 duration-300"
              @click="thumbnailIndex = index"/>
          </div>
        </div>

        <div class="mt-4 p-3 border-t-2 border-neutral">
          <h1 class="text-2xl text-center font-bold">{{ selectedAd.title }}</h1>
          <p>{{ selectedAd.description }}</p>
          <p class="text-end mt-3">{{ selectedAd.price }} €</p>
        </div>

        <div class="absolute top-4 right-4">
          <button class="bg-base-300 text-white rounded-full w-10 h-10 text-xl inline-flex items-center justify-center" @click="resetSelectedAd">✕</button>
        </div>
      </div>

      <div v-else class="loading loading-dots loading-lg"/>
    </div>

    <form method="dialog" class="modal-backdrop" @submit.prevent="resetSelectedAd">
      <button>Close</button>
    </form>
  </Modal>
</template>

<style scoped>
</style>
