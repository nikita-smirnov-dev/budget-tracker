<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';
import { createTransaction } from '@/utils/createTransaction.ts';
import { useFormValidation } from '@/composables/useFormValidation.ts';

const startAmount = ref<number | null>(null);
const emit = defineEmits(['add-first-transaction']);

const { isFormInvalid, isSubmitted } = useFormValidation(
  () => startAmount.value === null || startAmount.value < 0,
);

const handleStartBudget = (event: Event) => {
  event.preventDefault();
  isSubmitted.value = true;
  if (isFormInvalid.value || startAmount.value === null) return;

  const firstTransaction = createTransaction(
    'Стартовый баланс',
    Number(startAmount.value) || 0,
    'income',
  );

  emit('add-first-transaction', firstTransaction);
  isSubmitted.value = false;
};
</script>

<template>
  <Modal :show-close="false">
    <div class="budget__start card">
      <h1 class="budget-start__title">
        Приветствуем Вас в приложении "Мой бюджет"
      </h1>
      <p class="budget-start__text">
        Данное приложение поможет Вам вести учет своих денежных средств! Чтобы
        начать вести учет, укажите, сколько средств у вас есть прямо сейчас!
      </p>
      <form class="budget__start-form" @submit.prevent="handleStartBudget">
        <BaseInput
          class="budget-start__field"
          type="number"
          placeholder="Введите стартовый баланс"
          step="0.01"
          v-model.number="startAmount"
          @input="if ($event.target.value === '') startAmount = null;"
          @keydown.e.plus.minus.prevent
          @focusin="isSubmitted = false"
          :is-error="
            isSubmitted && isFormInvalid
              ? 'Поле должно содержать только цифры'
              : ''
          "
        />
        <BaseButton
          class="budget-start__btn"
          type="submit"
          :disabled="isSubmitted && isFormInvalid"
          >Начать расчет</BaseButton
        >
      </form>
    </div>
  </Modal>
</template>

<style scoped>
.budget__start {
  width: 60%;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  background: var(--card-bg-color);
}

.budget-start__title {
  text-align: center;
  margin: 0;
  font-size: 1.4rem;
}

.budget-start__text {
  text-align: center;
  margin: 0;
  line-height: 1.5;
}

.budget__start-form {
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 20px;
}

@media (max-width: 767.98px) {
  .budget__start {
    width: 100%;
  }
}

@media (max-width: 575.98px) {
  .budget__start-form {
    width: 100%;
  }
}
</style>
