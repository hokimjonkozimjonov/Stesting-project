<template>
  <div class="bg-white shadow-xl pb-4">
    <RouterLink :to="{ name: 'details', params: { id: item.id } }">
      <div>
        <img :src="item.image_url" alt="Card Image" class="w-full h-[200px]">
        <div class="flex gap-16 backdrop-blur-sm bg-white/50 -translate-y-14 pt-2.5 mb-[-40px] px-4">
          <div>
            <img class="w-6" src="../../assets/img/svg/eye.svg">
            <p class="text-base font-medium text-gray-400">{{ item.views }}</p>
          </div>
          <div>
            <img class="w-5" src="../../assets/img/svg/calendar.svg">
            <p class="text-base font-medium text-gray-400">{{ item.date }}</p>
          </div>
        </div>
      </div>
      <p class="font-semibold text-base text-back ml-5">{{ item.title }}</p>
      <p class="font-semibold text-base text-gray-400 line-clamp-1 ml-5">{{ item.description }}</p>
    </RouterLink>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>
