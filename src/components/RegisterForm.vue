<script setup lang="ts">
import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';

const emit = defineEmits(['switch-form']);

const handleLoginClick = () => {
  emit('switch-form', 'login');
};
</script>

<template>
  <div class="modal">
    <h3 class="modal__title">Регистрация</h3>
    <form class="modal__form">
      <BaseInput type="email" placeholder="Электронная почта" />
      <BaseInput type="text" placeholder="Имя" />
      <BaseInput type="text" placeholder="Фамилия" />
      <BaseInput type="password" placeholder="Пароль" />
      <BaseInput type="password" placeholder="Подтвердите пароль" />
      <BaseButton type="submit" variant-action="primary"
        >Создать аккаунт</BaseButton
      >
    </form>
    <BaseButton
      class="modal__btn"
      type="button"
      variant-action="secondary"
      @click="handleLoginClick"
      >У меня есть пароль</BaseButton
    >
  </div>
</template>

<style scoped>
.modal__btn {
  font-size: 0.8rem;
  font-weight: normal;
}
</style>
