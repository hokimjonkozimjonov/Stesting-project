<template>
	<div class="lg:flex items-center gap-10 shadow-xl py-5 px-8 my-5">
		<div>
			<img class="max-w-[250px]" :src="imageUrl" alt="book image">
		</div>
		<div cLASS="mt-5 lg:mt-0">
			<h3 class="font-bold text-2xl sm:text-3xl text-[#161c27] line-clamp-1 sm:line-clamp-3">{{ title }}</h3>
			<p class="my-5 font-normal text-[#73777d] line-clamp-1 sm:line-clamp-3" v-html="description"></p>
			<a :href="fileUrl">
				<Buttons text="Yuklab olish" variant="primary">
					<template #prefix>
						<div>
                            <svg
							    width="24"
							    height="24"
							    viewBox="0 0 24 24"
							    fill="none"
							    xmlns="http://www.w3.org/2000/svg"
							    class="inline"
						    >
							    <path
								    d="M19 12V19H5V12H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V12H19ZM13 12.67L15.59 10.09L17 11.5L12 16.5L7 11.5L8.41 10.09L11 12.67V3H13V12.67Z"
								    fill="white"
							    ></path>
						    </svg>
                        </div>
					</template>
				</Buttons>
			</a>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import Buttons from '../Common/Buttons.vue';

const props = defineProps({
  title: String,
  imageUrl: String,
  fileUrl: String,
  description: String,
});
</script>
