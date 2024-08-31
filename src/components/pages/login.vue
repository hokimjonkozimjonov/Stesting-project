<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 bg-[url-('../../assets/img/loginbg.png')] bg-cover bg-repeat">
    <div class="bg-white p-8 rounded-lg shadow-lg w-80">
      <div class="flex flex-col space-y-4 mb-6">
        <button @click="handleButtonClick('maktab')" class="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Maktab
        </button>
        <button @click="handleButtonClick('oquvchilar')" class="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600">
          O'quvchilar
        </button>
      </div>

      <div class="flex flex-col space-y-4">
        <div>
          <label for="login" class="block text-sm font-medium text-gray-700">Login</label>
          <input
            id="login"
            type="text"
            v-model="login"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your login"
          />
        </div>
        <div>
          <label for="parol" class="block text-sm font-medium text-gray-700">Parol</label>
          <input
            id="parol"
            type="password"
            v-model="parol"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your password"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const login = ref('');
const parol = ref('');

const handleButtonClick = (type) => {
  // Handle button click logic here
  console.log(`Button clicked: ${type}`);
};
</script>