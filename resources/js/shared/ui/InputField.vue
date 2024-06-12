<script setup lang="ts">
import { defineEmits, defineProps } from "vue"

const props = defineProps<{
  label?: string
  labelClass?: string
  modelValue: any
  type?: string
  inputClass?: string
  placeholder?: string
  required?: boolean
}>()

const emits = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>()

function updateValue(target: HTMLInputElement) {
  emits("update:modelValue", target.value)
}
</script>

<template>
  <div>
    <label v-if="label" class="block text-sm font-medium mb-1" :class="labelClass">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      class="input input-bordered w-full"
      :class="inputClass"
      :placeholder="placeholder"
      :required="required"
      @input="updateValue($event.target as HTMLInputElement)"
    />
  </div>
</template>