<template>
    <Section>
        <div class="container lg:flex justify-between items-center gap-10">
            <div class="bg-[url-('../assets/img/playerbg.png')] bg-cover bg-repeat">
                <iframe class="w-full lg:w-[500px] h-[300px]" :src="video.video"></iframe>
            </div>
            <div class="lg:max-w-[375px] ">
                <h3 class="font-bold text-4xl text-[#161c27]">Videodarslar</h3>
                <p class="font-normal text-[#161c27] my-4">Foydalanuvchilarga qulaylik yaratish maqsadida Stesting loyihasida videodarsliklar ham joylashtirilgan</p>
                <RouterLink>
                    <Buttons text="Barcha videolar" variant="primary"/>
                </RouterLink>
            </div>
        </div>
    </Section>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import Buttons from '../Common/Buttons.vue'

const video = ref({})

const getVideo = () => {
    fetch('https://qlapi.stesting.uz/api/v1/index/').then(res => res.json()).then(data => {
        video.value = data.main_video
    })
}

onMounted(() => {
  getVideo()  
})
</script>