<script setup lang="ts">
import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';

const emit = defineEmits(['switch-form']);

const handleRegisterClick = () => {
  emit('switch-form', 'register');
};
</script>

<template>
  <div class="login">
    <h3 class="login__title">Логин</h3>
    <form class="login__form">
      <BaseInput
        class="login__input"
        type="email"
        placeholder="Электронная почта"
      />
      <BaseInput class="login__input" type="password" placeholder="Пароль" />
      <BaseButton class="register__btn" type="submit" variant-action="primary"
        >Войти</BaseButton
      >
    </form>
    <BaseButton
      class="login__btn--login"
      type="button"
      variant-action="secondary"
      @click="handleRegisterClick"
      >Регистрация</BaseButton
    >
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  background: var(--card-bg-color);
}

.login__title {
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
}
</style>
