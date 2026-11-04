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
    <template v-if="form === 'login'"
      ><LoginForm @switch-form="switchForm"
    /></template>
    <template v-else="form === 'register'">
      <RegisterForm @switch-form="switchForm" />
    </template>
  </div>
</template>

<style scoped>
.auth {
  width: 100%;
}
</style>
