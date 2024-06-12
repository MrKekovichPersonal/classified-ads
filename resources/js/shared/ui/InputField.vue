<script setup lang="ts">
import { defineEmits, defineProps } from "vue"

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  inputClass: {
    type: String,
    default: "input input-bordered w-full",
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>()

function updateValue(target: HTMLInputElement) {
  emits("update:modelValue", target.value)
}
</script>

<template>
  <div class="mb-4">
    <label class="block text-sm font-medium mb-1">{{ label }}</label>
    <input :type="type" :value="modelValue" :class="inputClass" :required="required"
           @input="updateValue($event.target as HTMLInputElement)"/>
  </div>
</template>