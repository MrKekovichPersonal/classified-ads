<script setup lang="ts">
import { ref, watch } from "vue"
import InputField from "@/shared/ui/InputField.vue"
import TextAreaField from "@/shared/ui/TextAreaField.vue"
import { handleImageError } from "@/shared/lib"

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
const imageUrls = ref<string[]>(["", "", ""])
const price = ref<number>(0)

watch(() => props.show, (newVal) => {
  isVisible.value = newVal
})

function resetValues() {
  title.value = ""
  description.value = ""
  imageUrls.value = ["", "", ""]
  price.value = 0
}

function closeModal() {
  emits("close")
  resetValues()
}

function confirmAction() {
  const adData = {
    title: title.value,
    description: description.value,
    images: imageUrls.value.filter((url) => url !== ""),
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
      <form @submit.prevent="confirmAction" class="flex flex-col gap-2">
        <InputField label="Title" v-model="title" required placeholder="Title"/>
        <TextAreaField label="Description" v-model="description" required placeholder="Description"/>
        <div>
          <label class="block text-sm font-medium ">Image URLs (up to 3)</label>
          <div v-for="(url, index) in imageUrls" :key="index">
            <div class="my-3 flex flex-col justify-center">
              <InputField type="url" v-model="imageUrls[index]" placeholder="Image URL"/>
              <img v-if="url" :src="url" alt="Preview" class="mt-1 max-h-32 object-cover rounded-lg" @error="handleImageError"/>
            </div>
          </div>
        </div>
        <InputField label="Price" type="number" step="0.01" v-model="price" required placeholder="Price"/>
        <div class="modal-action">
          <button type="button" class="btn" @click="closeModal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
