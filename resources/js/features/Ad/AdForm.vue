<script setup lang="ts">
import { ref, watch } from "vue"

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits<{
  (e: "close"): void
  (e: "confirm", adData: { title: string, description: string, images: string[], price: number }): void
}>()

const isVisible = ref(props.show)
const title = ref("")
const description = ref("")
const imageUrls = ref<string[]>(["", "", ""]) // Инициализация с пустыми строками
const price = ref<number | null>(null)

watch(() => props.show, (newVal) => {
  isVisible.value = newVal
})

function resetValues() {
  title.value = ""
  description.value = ""
  imageUrls.value = ["", "", ""]
  price.value = 0.00
}

function closeModal() {
  emits("close")
  resetValues()
}

function confirmAction() {
  if (!price.value) return

  const adData = {
    title: title.value,
    description: description.value,
    images: imageUrls.value.filter(url => url !== ""), // Отфильтровываем пустые строки
    price: price.value,
  }
  emits("confirm", adData)
  resetValues()
}
</script>

<template>
  <slot/>

  <div v-if="isVisible" class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Create Ad</h3>
      <form @submit.prevent="confirmAction">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Title</label>
          <input type="text" v-model="title" class="input input-bordered w-full" required/>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea v-model="description" class="textarea textarea-bordered w-full" required></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Image URLs (up to 3)</label>
          <div v-for="(url, index) in imageUrls" :key="index" class="mb-2">
            <input type="url" v-model="imageUrls[index]" class="input input-bordered w-full" placeholder="Image URL"/>
            <img v-if="url" :src="url" alt="Preview" class="mt-2 max-h-48"/>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Price</label>
          <input type="number" step="0.01" v-model="price" class="input input-bordered w-full" required/>
        </div>
        <div class="modal-action">
          <button type="submit" class="btn btn-primary">Submit</button>
          <button type="button" class="btn" @click="closeModal">Close</button>
        </div>
      </form>
    </div>
  </div>
</template>
