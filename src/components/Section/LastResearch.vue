<template>
    <section class="bg-[#f8fbff]">
        <div class="container">
            <div class="md:flex justify-between items-center">
                <div class="mb-8 max-w-52 md:mb-0 bg-[url('https://stesting.uz/wrap3.png')] bg-cover bg-repeat">
                    <h2 class="font-bold text-[#161c27] text-4xl max-w-[164px]">So'ngi Tadqiqotlar</h2>
                </div>
                <RouterLink to="/research">
                    <Buttons text="Barcha tadqiqotlar" variant="primary"/>
                </RouterLink>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 item-center my-10">
                <Cards v-for="item in indexcard" :key="item.id" :item="item" />
            </div>
        </div>
        <div class="flex justify-end mt-[-80px]">
            <img src="https://stesting.uz/_nuxt/img/news-bg-item.fcbfd23.png">
        </div>
    </section>
</template>

<script setup>
import Buttons from '../Common/Buttons.vue'
import Cards from '../Common/Cards.vue'
import {ref, onMounted} from 'vue'

const indexcard = ref({});

const getIndexCard = () => {
	fetch(`https://qlapi.stesting.uz/api/v1/research/`)
		.then((res) => res.json())
		.then((data) => {
			indexcard.value = data.results;
		})
};

onMounted(() => {
    getIndexCard()
})

</script>