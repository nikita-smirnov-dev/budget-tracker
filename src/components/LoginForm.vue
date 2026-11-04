<script setup lang="ts">
import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';

const emit = defineEmits(['switch-form']);

const handleRegisterClick = () => {
  emit('switch-form', 'register');
};
</script>

<template>
  <div class="modal">
    <h3 class="modal__title">Логин</h3>
    <form class="modal__form">
      <BaseInput
        class="modal__input"
        type="email"
        placeholder="Электронная почта"
      />
      <BaseInput type="password" placeholder="Пароль" />
      <BaseButton type="submit" variant-action="primary">Войти</BaseButton>
    </form>
    <BaseButton
      class="modal__btn"
      type="button"
      variant-action="secondary"
      @click="handleRegisterClick"
      >Регистрация</BaseButton
    >
  </div>
</template>

<style scoped>
.modal__btn {
  font-size: 0.8rem;
  font-weight: normal;
}
</style>
