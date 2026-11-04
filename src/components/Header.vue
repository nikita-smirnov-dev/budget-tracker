<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import BaseButton from '@/UI/BaseButton.vue';
import Logo from '@/UI/Logo.vue';
import ThemeToggle from '@/UI/ThemeToggle.vue';

const props = defineProps<{
  theme: string;
}>();

const emit = defineEmits(['select-theme']);
const modalStore = useModalStore();
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <Logo />

      <div
        class="header__actions"
        role="toolbar"
        aria-label="Управление приложением"
      >
        <ThemeToggle :theme="theme" @select-theme="emit('select-theme')" />
        <BaseButton
          type="button"
          variant-action="primary"
          @click="modalStore.openModal('auth')"
          >Войти</BaseButton
        >
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 30px 0;
  border-bottom: 1px solid #b4b4b4;
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

@media (max-width: 575.98px) {
  .header {
    padding: 20px 0;
  }
}
</style>
