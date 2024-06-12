<script setup lang="ts">
import { AdForm } from "@/features/Ad";
import { TCreateAdRq, useAdStore } from "@/entities/Ad"
import { Modal } from "@/shared/ui"

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();

const store = useAdStore()

function handleClose() {
  emits("close");
}

function handleConfirm(adRq: TCreateAdRq) {
  store.addAd(adRq)
  emits("confirm");
}
</script>

<template>
  <Modal :show="props.show">
    <template #trigger>
      <slot/>
    </template>

    <div class="modal-box">
      <AdForm :show="props.show" @close="handleClose" @confirm="handleConfirm"/>
    </div>
  </Modal>
</template>
