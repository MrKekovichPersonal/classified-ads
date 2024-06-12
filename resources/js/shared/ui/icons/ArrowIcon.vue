<script setup lang="ts">
const props = defineProps<{
  class?: string
  direction?: "left" | "right" | "up" | "down"
}>()
function getDirectionClass() {
  switch (props.direction) {
    case "left":
      return "rotate-180"
    case "up":
      return "rotate-90"
    case "down":
      return "rotate-270"
    default:
      return ""
  }
}
</script>

<template>
  <!--Chevron arrow-->
  <svg class="fill-current" :class="`${getDirectionClass()} ${props.class}`" viewBox="0 0 16 16"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
  </svg>
</template>

<style scoped>

</style>