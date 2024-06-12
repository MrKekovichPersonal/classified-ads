<script setup lang="ts">
import { defineEmits, defineProps } from "vue"

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  textareaClass: {
    type: String,
    default: "textarea textarea-bordered w-full",
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>()

function updateValue(target: HTMLTextAreaElement) {
  emits("update:modelValue", target.value)
}
</script>

<template>
  <div class="mb-4">
    <label class="block text-sm font-medium mb-1">{{ label }}</label>
    <textarea :value="modelValue" :class="textareaClass" :required="required"
              @input="updateValue($event.target as HTMLTextAreaElement)"></textarea>
  </div>
</template>