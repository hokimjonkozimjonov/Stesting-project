<template>
    <Section class="mt-40">
        <div class="container lg:bg-[url('../assets/img/statisticsbg.png')] bg-cover bg-repeat">
            <div class="sm:mx-28 lg:mx-0 lg:flex justify-center gap-8 mt-[-80px] pb-10">
                <div class="bg-white py-5 px-16 text-center shadow-lg">
                    <p class="font-bold text-[#4f95ff] text-5xl">{{ animatedCount.tests }}</p>
                    <p class="font-semibold text-[#161c27] text-xl mt-5">O`quvchilar</p>
                </div>
                <div class="my-10 lg:my-0 bg-white py-5 px-16 text-center shadow-lg">
                    <p class="font-bold text-[#4f95ff] text-5xl">{{ animatedCount.participants }}</p>
                    <p class="font-semibold text-[#161c27] text-xl mt-5">Maktablar</p>
                </div>
                <div class="bg-white py-5 px-16 text-center shadow-lg">
                    <p class="font-bold text-[#4f95ff] text-5xl">{{ animatedCount.registered }}</p>
                    <p class="font-semibold text-[#161c27] text-xl mt-5">Topshiriqlar</p>
                </div>
            </div>
        </div>
    </Section>
</template>

<script setup>
import {ref, onMounted} from 'vue'

const count = ref({})
const animatedCount = ref({ tests: 0, participants: 0, registered: 0 })

const getCounts = () => {
    fetch('https://qlapi.stesting.uz/api/v1/index/')
        .then(res => res.json())
        .then(data => {
            count.value = data.statistics
            startCounting()
        })
}

const startCounting = () => {
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)

        animatedCount.value.tests = Math.floor(progress * count.value.tests)
        animatedCount.value.participants = Math.floor(progress * count.value.participants)
        animatedCount.value.registered = Math.floor(progress * count.value.registered)

        if (progress < 1) {
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate)
}

onMounted(() => {
    getCounts()
})
</script>
