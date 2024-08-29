<template>
	<section>
		<div class="container">
			<div class="mt-20 p-8 bg-[#f8fbff]">
				<h1 class="font-bold text-4xl text-[#161c27]">Nashrlar</h1>
				<div class="md:flex items-center mt-5 justify-between">
					<div class="md:flex items-center gap-5">
						<Buttons text="Xalqaro" variant="secondary" class="mb-5 md:mb-0"/>
						<Buttons text="Milliy" variant="secondary" />
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
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
				<VideoLes
					v-for="item in videoCard"
					:key="item.id"
					:title="item.title"
					:video="item.video"
					:views="item.views"
					:date="item.date"
				/>
			</div>
            <div class="text-end">
				<button
					v-if="pageNumbers.length > 1"
					v-for="pageNum in pageNumbers"
					:key="pageNum"
					class="border p-3 shadow-sm bg-white"
					@click="requestPublications(pageNum)"
				>
					{{ pageNum }}
				</button>
			</div>
		</div>
	</section>
</template>


<script setup>
import Buttons from '../Common/Buttons.vue';
import { onMounted, ref, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import VideoLes from '../Common/VideoLes.vue';

const router = useRouter();
const route = useRoute();

const category = ref([]);
const selectedCategory = ref('Tanlang');

const getCategory = () => {
	fetch('https://qlapi.stesting.uz/api/v1/videocourse/videocourse-category/')
		.then((res) => res.json())
		.then((data) => {
			category.value = data.map((item) => ({
				title: item.title,
				slug: item.slug,
			}));
		})
		.catch((error) => console.error('Error fetching category:', error));
};

const videoCard = ref([]);
const page = ref(1);
const totalPages = ref(0);

const getVideo = (slug = '', pageNum = 1) => {
	fetch(`https://qlapi.stesting.uz/api/v1/videocourse/?page=${pageNum}&category__slug=${slug}`)
		.then((res) => res.json())
		.then((data) => {
			videoCard.value = data.results;
			totalPages.value = data.total_pages;
		});
};

const requestPublications = (pageNum) => {
	page.value = pageNum;
	const slug = getSlug(selectedCategory.value);
	getVideo(slug, pageNum);
	router.push({ query: { category: slug, page: pageNum } });
};

onMounted(() => {
	getCategory();
	const selectedSlug = route.query.category || '';
	page.value = parseInt(route.query.page) || 1;
	if (selectedSlug) {
		const selected = category.value.find((item) => item.slug === selectedSlug);
		if (selected) {
			selectedCategory.value = selected.title;
		}
	}
	getVideo(selectedSlug, page.value);
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
	page.value = 1;
	getVideo(slug, page.value);
	router.push({ query: { category: slug, page: page.value } });
};

const getSlug = (selectedTitle) => {
	if (selectedTitle === 'Barchasi') {
		return '';
	} else {
		const selectedItem = category.value.find((item) => item.title === selectedTitle);
		return selectedItem ? selectedItem.slug : '';
	}
};

watch(route, (newRoute) => {
	const selectedSlug = newRoute.query.category || '';
	page.value = parseInt(newRoute.query.page) || 1;
	getVideo(selectedSlug, page.value);
});

const pageNumbers = computed(() => {
	const maxPagesToShow = 5;
	const startPage = Math.max(1, page.value - Math.floor(maxPagesToShow / 2));
	const endPage = Math.min(totalPages.value, startPage + maxPagesToShow - 1);

	const pages = [];
	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	return pages;
});
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
