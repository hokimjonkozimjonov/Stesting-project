<template>
    <Section class="bg-[url('../assets/img/hero-img.png')] bg-cover bg-repeat bg-[#f8f9fa] pt-28">
        <div class="container flex items-center gap-10 justify-center">
            <div class="max-w-[482px]">
                <h1 class="font-bold text-[#161c27] text-3xl sm:text-5xl">{{datas.title}}</h1>
                <p class="my-5" v-html='datas.description'></p>
                <RouterLink to="/videoLessons">
                    <Buttons text="Video yo'riqnoma" variant="primary"/>
                </RouterLink>
            </div>
            <div class="mb-[-20px] hidden md:block">
                <img src="https://stesting.uz/focused-man.png" alt="stesting main image">
            </div>
        </div>
    </Section>
</template>

<script setup>
import {ref} from 'vue'
import Buttons from '../Common/Buttons.vue'

const datas = ref({})

const getDatas = () => {
    fetch('https://qlapi.stesting.uz/api/v1/index/').then(res => res.json()).then(data => {
        datas.value = data.registration
    })
}

getDatas()
</script>