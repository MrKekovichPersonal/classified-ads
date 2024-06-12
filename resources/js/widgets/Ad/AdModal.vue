<script setup lang="ts">
import AdForm from "@/features/Ad/AdForm.vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm", adData: { title: string, description: string, images: string[], price: number | null }): void;
}>();

function handleClose() {
  emits("close");
}

function handleConfirm(adData: { title: string, description: string, images: string[], price: number | null }) {
  emits("confirm", adData);
}
</script>

<template>
  <AdForm :show="props.show" @close="handleClose" @confirm="handleConfirm">
    <slot/>
  </AdForm>
</template>
