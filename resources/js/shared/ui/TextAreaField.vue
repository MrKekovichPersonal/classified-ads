<script setup lang="ts">
import { defineEmits, defineProps } from "vue"

const props = defineProps<{
  label?: string
  labelClass?: string
  modelValue: any,
  rows?: number
  placeholder?: string
  textareaClass?: string
  required?: boolean
}>()

const emits = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>()

function updateValue(target: HTMLTextAreaElement) {
  emits("update:modelValue", target.value)
}
</script>

<template>
  <div>
    <label class="block text-sm font-medium mb-1" :class="labelClass">{{ label }}</label>
    <textarea
      :value="modelValue"
      class="textarea textarea-bordered w-full"
      :class="textareaClass"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      @input="updateValue($event.target as HTMLTextAreaElement)"/>
  </div>
</template>