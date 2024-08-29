<template>
    <div>
        <div class="shadow-xl my-10">
            <div>
                <iframe class="w-full h-[200px]" :src="video"></iframe>
            </div>
            <div class="px-5 py-5">
                <h3 class="font-bold text-[#161c27] text-base">{{title}}</h3>
                <div class="flex gap-5 items-center mt-10">
                    <div class="flex gap-2 items-center">
                        <img class="w-5 h-5" src="../../assets/img/svg/eye.svg">
                        <p class="font-normal text-[#161c27]">{{views}}</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <img class="w-5 h-5" src="../../assets/img/svg/calendar.svg">
                        <p class="font-normal text-[#161c27]">{{date}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  video: String,
  views: String,
  date: String,
});
</script>