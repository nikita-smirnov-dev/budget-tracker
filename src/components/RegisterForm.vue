<script setup lang="ts">
import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';

const emit = defineEmits(['switch-form']);

const handleLoginClick = () => {
  emit('switch-form', 'login');
};
</script>

<template>
  <div class="register">
    <h3 class="register__title">Регистрация</h3>
    <form class="register__form">
      <BaseInput
        class="register__input"
        type="email"
        placeholder="Электронная почта"
      />
      <BaseInput class="register__input" type="text" placeholder="Имя" />
      <BaseInput class="register__input" type="text" placeholder="Фамилия" />
      <BaseInput class="register__input" type="password" placeholder="Пароль" />
      <BaseInput
        class="register__input"
        type="password"
        placeholder="Подтвердите пароль"
      />
      <BaseButton class="register__btn" type="submit" variant-action="primary"
        >Создать аккаунт</BaseButton
      >
    </form>
    <BaseButton
      class="register__btn--login"
      type="button"
      variant-action="secondary"
      @click="handleLoginClick"
      >У меня есть пароль</BaseButton
    >
  </div>
</template>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  background: var(--card-bg-color);
}

.register__title {
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
}

.register__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
}
</style>
