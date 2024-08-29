<template>
	<section class="container">
		<div class="mt-20 p-5 bg-[#f8fbff]">
			<div>
				<h1 class="head font-bold text-4xl text-[#161c27]">Tadqiqotlar</h1>
			</div>
			<div class="md:flex justify-between items-center mt-5">
				<div class="md:flex gap-3 items-center">
					<Buttons @click="xalqaro" text="Xalqaro" variant="secondary" class="mb-5 md:mb-0"/>
					<Buttons @click="milliy" text="Milliy" variant="secondary" />
				</div>
				<div class="mt-8 md:mt-0">
					<div @click="toggleTitle" class="relative inline-block text-left">
						<button
							@click="toggleDropdown"
							class="flex items-center gap-36 pl-5 pr-8 py-2 border border-[#4f95ff]"
						>
							<span>{{ selectedCategory }}</span>
							<img
								class="ml-2 img"
								:class="{ rotate: isRotated }"
								src="../../assets/img/svg/down.svg"
								alt="Dropdown icon"
							/>
						</button>
						<div
							v-show="isDropdownOpen"
							class="absolute px-2 py-2 mt-2 w-full bg-white shadow-lg border border-[#4f95ff]"
						>
							<div
								@click="selectCategory('Barchasi')"
								class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
							>
								Barchasi
							</div>
							<div
								v-for="(item, index) in category"
								:key="index"
								@click="selectCategory(item.title)"
								class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
							>
								{{ item.title }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 item-center my-10">
			<Cards v-for="item in card.list" :key="item.id" :item="item" />
		</div>
	</section>
</template>

<script setup>
import Buttons from '../Common/Buttons.vue';
import Cards from '../Common/Cards.vue'
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const category = ref([]);
const selectedCategory = ref('Tanlang');

const getCategory = () => {
	fetch('https://qlapi.stesting.uz/api/v1/research/research-category')
		.then((res) => res.json())
		.then((data) => {
			category.value = data.map((item) => ({ title: item.title, slug: item.slug }));
		})
		.catch((error) => console.error('Error fetching category:', error));
};

const card = ref({
	list: [],
	loading: true
});

const getCard = (slug = '') => {
	fetch(`https://qlapi.stesting.uz/api/v1/research/?page=1&category__slug=${slug}`)
		.then((res) => res.json())
		.then((data) => {
			card.value.list = data.results;
		})
		.finally(() => (card.value.loading = false));
};

const area = ref([])

const getArea = () => {
	fetch('https://qlapi.stesting.uz/api/v1/research/').then(res => res.json()).then(data => {
		area.value = data.results.map(item => item.get_area_display)
	})
}



onMounted(() => {
	getCategory();
	const selectedSlug = route.query.category || ''; 
	if (selectedSlug) {
		const selected = category.value.find((item) => item.slug === selectedSlug);
		if (selected) {
			selectedCategory.value = selected.title;
		}
	}
	getCard(selectedSlug);
	getArea() 
});

const isDropdownOpen = ref(false);
const isRotated = ref(false);

const toggleDropdown = () => {
	isDropdownOpen.value = !isDropdownOpen.value;
	isRotated.value = !isRotated.value;
};

const selectCategory = (title) => {
	selectedCategory.value = title;
	isDropdownOpen.value = false;
	isRotated.value = false;

	const slug = getSlug(title);
	getCard(slug);

	router.push({ query: { category: slug } }); 
};

const getSlug = (selectedTitle) => {
	if (selectedTitle === 'Barchasi') {
		return '';
	} else {
		const selectedItem = category.value.find((item) => item.title === selectedTitle);
		return selectedItem ? selectedItem.slug : '';
	}
};

const xalqaro = () => {
	const are = area.value = card._rawValue.list[0]?.get_area_display
	if(are === 'XALQARO'){
		are
	}
}
</script>

<style scoped>
.img {
	max-width: 14px;
	transition: transform 0.3s ease;
}

.img.rotate {
	transform: rotate(180deg);
}
</style>
