<script setup lang="ts">
import BaseButton from '@/UI/BaseButton.vue';

import { PhSun } from '@kalimahapps/vue-icons';
import { PhThinMoon } from '@kalimahapps/vue-icons';

const props = defineProps<{
  theme: string;
}>();

const emit = defineEmits(['select-theme']);
</script>

<template>
  <BaseButton
    class="theme"
    @click="emit('select-theme')"
    variant-action="icon"
    :aria-label="
      theme === 'dark'
        ? 'Переключить на светлую тему'
        : 'Переключить на темную тему'
    "
    :title="
      theme === 'dark'
        ? 'Переключить на светлую тему'
        : 'Переключить на темную тему'
    "
  >
    <Transition name="icon-flip" mode="out-in">
      <PhSun
        v-if="theme === 'dark'"
        class="theme__icon"
        :key="'sun'"
        aria-hidden="true"
      />
      <PhThinMoon v-else class="theme__icon" :key="'moon'" aria-hidden="true" />
    </Transition>
  </BaseButton>
</template>

<style scoped>
.theme {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid var(--main-text-color);
  color: var(--main-text-color);
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;
}

@media (hover: hover) {
  .theme:hover {
    opacity: 1;
  }
}

.theme:active {
  opacity: 1;
}

.theme__icon {
  width: 24px;
  height: 24px;
  color: currentcolor;
}

.icon-flip-enter-active,
.icon-flip-leave-active {
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}

.icon-flip-enter-from {
  opacity: 0;
  transform: rotate(-180deg);
}

.icon-flip-leave-to {
  opacity: 0;
  transform: rotate(180deg);
}
</style>
