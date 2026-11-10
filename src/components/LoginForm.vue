<script setup lang="ts">
import { ref } from 'vue';

import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';
import { useToastStore } from '@/stores/toastStore';
import { useUserStore } from '@/stores/userStore';
import { useModalStore } from '@/stores/modalStore';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { loginFormSchema } from '@/schemas/authSchemas';

const formError = ref('');

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginFormSchema),
});

const emit = defineEmits(['switch-form']);

const handleRegisterClick = () => {
  emit('switch-form', 'register');
};

const userStore = useUserStore();
const toastStore = useToastStore();
const modalStore = useModalStore();

const sendFormLogin = handleSubmit(async (values) => {
  formError.value = '';
  userStore.error = null;

  try {
    await userStore.login(values.email, values.password);

    toastStore.addToast({
      message: 'Вы успешно вошли!',
      type: 'success',
    });

    modalStore.closeModal();
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
    <h3 class="modal__title">Логин</h3>
    <form class="modal__form" @submit.prevent="sendFormLogin">
      <BaseInput
        class="modal__input"
        type="email"
        placeholder="Электронная почта"
        name="email"
      />
      <BaseInput type="password" placeholder="Пароль" name="password" />
      <p v-if="formError">
        {{ formError }}
      </p>
      <BaseButton
        type="submit"
        variant-action="primary"
        :disabled="userStore.loader"
        >{{ userStore.loader ? 'Вход...' : 'Войти' }}</BaseButton
      >
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
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.modal__btn:hover {
  font-size: 0.8rem;
  font-weight: normal;
  opacity: 1;
}
</style>
