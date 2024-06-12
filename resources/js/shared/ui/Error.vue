<script setup lang="ts">
import { ReloadIcon } from "@/shared/ui/icons"

defineProps<{
  errorMessage: string
}>()

function handleReload() {
  window.location.reload()
}
</script>

<template>
  <div
    class="fixed top-0 left-0 z-50 flex flex-col justify-center items-center w-screen h-screen bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-200/60">
    <h6>Something went wrong :(</h6>
    <div class="bg-base-300 rounded-lg border border-neutral flex">
      <h1 class="p-4 text-center text-3xl max-w-2xl max-h-[100px] overflow-y-auto">{{ errorMessage }}</h1>
      <div class="w-16 border-l border-neutral hover:bg-neutral cursor-pointer duration-300"
           @click.prevent="handleReload">
        <ReloadIcon class="w-full h-full p-3"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>