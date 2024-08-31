<template>
  <div>
    <button @click="handleClick" :class="styleButton()" class="py-2 px-14 flex gap-2 items-center">
      <slot name='prefix' />
      {{ text }}
      <slot name='suffix' />
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  text: String,
  variant: String,
});

const emits = defineEmits(['click']);

const styleButton = () => {
  switch (props.variant) {
    case 'primary':
      return 'primary';
    case 'secondary':
      return 'secondary';
  }
};

const handleClick = () => {
  emits('click');
};
</script>

<style scoped>
.primary {
  background: #4f95ff;
  border: 1px solid #4f95ff;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  transition: 0.3s;
}

.primary:hover {
  background: #1064b2;
}

.secondary {
  background: #e1edff;
  border: 1px solid #e1edff;
  color: #4f95ff;
  font-weight: 600;
  font-size: 16px;
  transition: 0.3s;
}

.secondary:hover {
  color: #000000;
}
</style>
