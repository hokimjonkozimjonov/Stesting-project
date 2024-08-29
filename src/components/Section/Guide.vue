<template>
    <Section class="my-10">
        <div class="container sm:flex justify-between shadow-xl">
            <nav class="p-5">
                <ul class="text-center sm:text-start">
                    <li v-for='item in guide' :key='item.id' :item='item' class="font-medium text-xl text-[#161c27] hover:text-[#73777d] duration-500 cursor-pointer">
                    {{item.title}}
                    <div class="w-full h-[1px] block bg-[#73777d] my-2"></div>
                    </li>
                </ul>
            </nav>
            <div class="py-5 pr-3 flex justify-center">
                <iframe class="h-full w-[450px] md:w-[650px] lg:w-[750px]" src="https://www.youtube.com/embed/-ODNf9FfvMA\"></iframe>
            </div>
        </div>
    </Section>
</template>

<script setup>
import {ref, onMounted} from 'vue'

const guide = ref({})

const getGuide = () => {
    fetch('https://qlapi.stesting.uz/api/v1/instruction/').then(res => res.json()).then(data => {
        guide.value = data    
    })
}

onMounted(() => {
    getGuide()
})
</script>