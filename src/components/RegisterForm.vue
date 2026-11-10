<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

import { useToastStore } from '@/stores/toastStore';
import { useUserStore } from '@/stores/userStore';
import { registerFormSchema } from '@/schemas/authSchemas';

import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';

const formError = ref('');

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(registerFormSchema),
});

const emit = defineEmits(['switch-form']);

const handleLoginClick = () => {
  emit('switch-form', 'login');
};

const userStore = useUserStore();
const toastStore = useToastStore();

const sendFormRegister = handleSubmit(async (values) => {
  formError.value = '';
  userStore.error = null;

  try {
    await userStore.register(
      values.name,
      values.surname,
      values.email,
      values.password,
    );

    toastStore.addToast({
      message: 'Регистрация успешна! Войдите в аккаунт',
      type: 'success',
    });

    emit('switch-form', 'login');
  } catch (error: unknown) {
    if (error instanceof Error) {
      formError.value = error.message;
    } else {
      formError.value = 'Произошла непредвиденная ошибка';
    }
  }
});
</script>

<template>
  <div class="modal">
    <h3 class="modal__title">Регистрация</h3>
    <form class="modal__form" @submit.prevent="sendFormRegister">
      <BaseInput type="email" placeholder="Электронная почта" name="email" />
      <BaseInput type="text" placeholder="Имя" name="name" />
      <BaseInput type="text" placeholder="Фамилия" name="surname" />
      <BaseInput type="password" placeholder="Пароль" name="password" />
      <BaseInput
        type="password"
        placeholder="Подтвердите пароль"
        name="confirmPassword"
      />
      <p v-if="formError">
        {{ formError }}
      </p>
      <BaseButton
        type="submit"
        variant-action="primary"
        :disabled="userStore.loader"
        >{{ userStore.loader ? 'Создание...' : 'Создать аккаунт' }}</BaseButton
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
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.modal__btn:hover {
  font-size: 0.8rem;
  font-weight: normal;
  opacity: 1;
}
</style>
