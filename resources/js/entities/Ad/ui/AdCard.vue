<script setup lang="ts">
import { TAd } from "@/entities/Ad/model"

const { ad } = defineProps<{ ad: TAd }>()
</script>

<template>
  <div class="card overflow-hidden border border-neutral rounded-lg bg-neutral shadow-md shadow-base-300 cursor-pointer hover:bg-base-300 duration-300">
    <img :src="ad.main_photo" class="h-[200px] border-b border-base-100 object-cover" :alt="ad.title"/>
    <div class="p-4 card-body">
      <h6 class="text-2xl font-bold card-title truncate">
        {{
          ad.title.length > 20
            ? ad.title.slice(0, 20) + "..."
            : ad.title
        }}
      </h6>
      <p class="text-lg text-end">{{ ad.price }} €</p>
    </div>
  </div>
</template>