<script setup lang="ts">
import Logo from '@/UI/Logo.vue';
import ThemeToggle from '@/UI/ThemeToggle.vue';

const props = defineProps<{
  theme: string;
}>();

const emit = defineEmits(['select-theme']);
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <Logo />

      <ThemeToggle :theme="theme" @select-theme="emit('select-theme')" />
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

@media (max-width: 575.98px) {
  .header {
    padding: 20px 0;
  }
}
</style>
