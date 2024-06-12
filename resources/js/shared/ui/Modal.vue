<script setup lang="ts">

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
    <slot/>
  </dialog>
</template>

<style scoped>

</style>