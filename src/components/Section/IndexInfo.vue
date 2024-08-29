<template>
    <Section class="my-20">
        <div class="container md:flex justify-center items-center gap-10 bg-[#f8f9fa]">
            <div>
                <div class="relative">
                    <h2 class="font-bold text-3xl sm:text-4xl text-[#161c27]">Stesting</h2>
                    <p class="font-bold text-3xl sm:text-4xl text-[#161c27]">loyihasi haqida</p>
                </div>
                <img class="ml-20 md:mt-2 absolute" src="https://stesting.uz/wrap2.png">
            </div>
            <div class="md:flex items-center gap-10 py-10">
                <p class="mb-5 mt-[-20px] md:my-0 max-w-[482px] font-medium text-[#161c27]">{{ info }}</p>
                <RouterLink to="/about">
                    <Buttons text="Batafsil" variant="primary"/>
                </RouterLink>
            </div>
        </div>
    </Section>
</template>

<script setup>
import {ref} from 'vue'
import Buttons from '../Common/Buttons.vue'

const info = ref({})

const getInfo = () => {
    fetch('https://qlapi.stesting.uz/api/v1/index/').then(res => res.json()).then(data => {
        info.value = data.short_description
    })
}

getInfo()
</script>