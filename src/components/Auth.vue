<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

const form = ref<'login' | 'register'>('login');

const switchForm = (newForm: 'login' | 'register') => {
  form.value = newForm;
};
</script>

<template>
  <div class="auth">
    <div v-if="form === 'login'"><LoginForm @switch-form="switchForm" /></div>
    <div v-else="form === 'register'">
      <RegisterForm @switch-form="switchForm" />
    </div>
  </div>
</template>

<style scoped></style>
