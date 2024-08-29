<template>
  <div class="container">
    <div class="bg-[#f8fbff] p-5 mt-20">
      <h1 class="font-bold text-3xl text-black-100 mb-4">{{ details.title }}</h1>
      <div class="flex gap-10">
        <div class="flex items-center gap-2">
          <img class="w-6" src="../../assets/img/svg/eye.svg">
          <p class="font-medium text-base text-gray-400">{{ details.views }}</p>
        </div>
        <div class="flex items-center gap-2">
          <img class="w-5" src="../../assets/img/svg/calendar.svg">
          <p class="font-medium text-base text-gray-400">{{ details.date }}</p>
        </div>
      </div>
    </div>
    <div class="my-5">
      <img class="mb-5" :src="details.image_url">
      <div v-html="details.content"></div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const details = ref({});

const fetchDetails = (id) => {
  fetch(`https://qlapi.stesting.uz/api/v1/research/${id}/`)
    .then(res => res.json())
    .then(data => {
      details.value = data;
    })
    .catch(error => console.error('Error fetching details:', error));
};

onMounted(() => {
  const id = route.params.id;  
  if (id) {
    fetchDetails(id);  
  }
});
</script>
