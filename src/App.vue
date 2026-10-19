<script setup>
import { ref, watch } from 'vue';
import Header from '@/components/Header.vue';
import HomeView from './views/HomeView.vue';
import Footer from '@/components/Footer.vue';

const theme = ref(localStorage.getItem('user-theme') || 'dark');

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
};

watch(
  theme,
  (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('user-theme', newTheme);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <Header @select-theme="toggleTheme" :theme="theme" />
  <main class="main">
    <HomeView />
  </main>
  <Footer />
</template>
