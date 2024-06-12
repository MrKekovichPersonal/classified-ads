<script setup lang="ts">

import { blurFilter } from "@/shared/lib/blurFilter"

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
  }
})

</script>

<template>
  <slot name="trigger"/>
  <dialog :open="props.show" class="modal bg-black/30" :class="props.class">
    <slot name="content"/>
  </dialog>
</template>

<style scoped>

</style>