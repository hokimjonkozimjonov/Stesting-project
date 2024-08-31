<template>
	<header class="shadow-xl bg-white w-full bg-[#f8f9fa] fixed">
		<div class="container flex justify-between md:gap-4 items-center lg:gap-8">
			<RouterLink to="/">
				<img
					class="max-w-[200px]"
					:src="menu.list.logo_url"
					alt="Stesting logo"
				/>
			</RouterLink>
			<nav class="min-[100px]:hidden md:block">
				<ul class="list flex items-center md:gap-3 lg:gap-10">
					<li
						v-for="item in links"
						:key="item.id"
						:item="item"
						class="font-semibold text-base text-black-100 hover:text-blue-600"
					>
						<RouterLink :to="item.to"> {{ item.name }} </RouterLink>
					</li>
				</ul>
			</nav>
			<div class="min-[100px]:hidden md:block relative inline-block text-left">
				<button @click="toggleDropdown" class="flex items-center gap-2 px-3">
					<span>{{ selectedOption }}</span>
					<img
						class="ml-2 img"
						:class="{ rotate: isRotated }"
						src="../../assets/img/svg/down.svg"
						alt="Dropdown icon"
					/>
				</button>
				<div
					v-show="isDropdownOpen"
					class="absolute px-2 mt-2 w-full bg-white shadow-lg"
				>
					<div
						v-for="option in options"
						:key="option"
						@click="selectOption(option)"
						class="cursor-pointer p-2 hover:bg-gray-100"
					>
						{{ option }}
					</div>
				</div>
			</div>
			<div class="min-[100px]:hidden md:block">
				<Buttons text="Kirish" variant="primary" />
			</div>
			<div class="min-[100px]:block md:hidden">
				<button @click="openModal">
					<img class="w-6" src="../../assets/img/svg/bars.svg" alt="Menu" />
				</button>
				<div
					v-if="isModalOpen"
					class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
				>
					<div
						class="bg-white p-6 w-full max-w-md h-full transform transition-transform duration-300 ease-in-out"
						:class="{
							'translate-x-0': isModalOpen,
							'translate-x-full': !isModalOpen,
						}"
					>
						<button @click="closeModal" class="absolute top-4 right-4">
							<img
								class="w-6"
								src="../../assets/img/svg/xmark.svg"
								alt="Close"
							/>
						</button>
						<ul class="list flex flex-col gap-4 my-4">
							<li
								v-for="item in links"
								:key="item.id"
								:item="item"
								class="font-semibold text-base text-black-100 hover:text-blue-600"
							>
								<RouterLink :to="item.to"> {{ item.name }} </RouterLink>
							</li>
						</ul>
						<div class="relative inline-block text-left">
							<button
								@click="toggleDropdown"
								class="flex items-center gap-2 px-3"
							>
								<span>{{ selectedOption }}</span>
								<img
									class="ml-2 img"
									:class="{ rotate: isRotated }"
									src="../../assets/img/svg/down.svg"
									alt="Dropdown icon"
								/>
							</button>
							<div
								v-show="isDropdownOpen"
								class="absolute px-2 mt-2 w-full bg-white shadow-lg"
							>
								<div
									v-for="option in options"
									:key="option"
									@click="selectOption(option)"
									class="cursor-pointer p-2 hover:bg-gray-100"
								>
									{{ option }}
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { links } from '../data';
import { ref, onMounted } from 'vue';
import Buttons from '../Common/Buttons.vue';

const menu = ref({
	list: Array,
	loading: true,
});

const isDropdownOpen = ref(false);
const isRotated = ref(false);
const isModalOpen = ref(false);
const selectedOption = ref('Uzbekcha');
const options = ['Uzbekcha', 'Ruscha', 'Inglizcha'];

const toggleDropdown = () => {
	isDropdownOpen.value = !isDropdownOpen.value;
	isRotated.value = !isRotated.value;
};

const selectOption = (option) => {
	selectedOption.value = option;
	isDropdownOpen.value = false;
	isRotated.value = false;
};

const openModal = () => {
	isModalOpen.value = true;
};

const closeModal = () => {
	isModalOpen.value = false;
};

const getMenu = () => {
	fetch('https://qlapi.stesting.uz/api/v1/menu/')
		.then((res) => res.json())
		.then((data) => {
			menu.value.list = data;
		})
		.finally(() => (menu.value.loading = false));
};

onMounted(() => {
	getMenu();
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

.translate-x-0 {
	transform: translateX(0);
}

.translate-x-full {
	transform: translateX(100%);
}
</style>
