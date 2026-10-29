<script setup lang="ts">
import { ref, watch } from 'vue';

import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';
import BaseInputRadio from '@/UI/BaseInputRadio.vue';
import BaseRadioGroup from '@/UI/BaseRadioGroup.vue';

import type { TransactionType } from '@/types/budgetTypes';
import { createTransaction } from '@/utils/createTransaction';
import { useFormValidation } from '@/composables/useFormValidation';
import { useBudgetStore } from '@/stores/budgetStore';
import BaseError from '@/UI/BaseError.vue';

const emit = defineEmits(['add-transaction']);

const props = defineProps<{
  selectedTitle?: string;
}>();

const budgetStore = useBudgetStore();
const { isFormInvalid, isSubmitted } = useFormValidation(
  () =>
    budgetObj.value.title.trim() === '' ||
    budgetObj.value.amount === null ||
    budgetObj.value.amount <= 0,
);

const budgetObj = ref({
  title: '',
  amount: null as number | null,
  type: 'income' as TransactionType,
});

const sendForm = () => {
  isSubmitted.value = true;

  if (isFormInvalid.value) return;

  const newTransaction = createTransaction(
    budgetObj.value.title,
    budgetObj.value.amount || 0,
    budgetObj.value.type,
  );

  emit('add-transaction', newTransaction);
  budgetObj.value = {
    title: '',
    amount: null,
    type: 'income',
  };

  isSubmitted.value = false;
};

watch(
  () => props.selectedTitle,
  (newTitle) => {
    if (newTitle) {
      budgetObj.value.title = newTitle;
    }
  },
);
</script>

<template>
  <form class="budget-form card" @submit.prevent="sendForm">
    <h2 class="budget-form__title">Введите транзакцию</h2>
    <BaseInput
      class="budget-form__field"
      type="text"
      placeholder="Введите название"
      v-model="budgetObj.title"
      @focusin="isSubmitted = false"
      :is-error="
        isSubmitted && budgetObj.title.trim() === ''
          ? 'Введите название транзакции'
          : ''
      "
    />
    <BaseInput
      class="budget-form__field"
      type="number"
      placeholder="Введите сумму"
      v-model.number="budgetObj.amount"
      step="0.01"
      @focusin="isSubmitted = false"
      :is-error="
        isSubmitted && (budgetObj.amount === null || budgetObj.amount <= 0)
          ? 'Сумма должна быть больше нуля'
          : ''
      "
    />
    <p id="group-type" class="budget-form__text">Тип транзакции:</p>

    <BaseRadioGroup class="budget-form__type" aria-labelledby="group-type">
      <BaseInputRadio
        type="radio"
        name="type"
        value="income"
        is-checked
        v-model="budgetObj.type"
        >Доход</BaseInputRadio
      >
      <BaseInputRadio
        type="radio"
        name="type"
        value="expense"
        v-model="budgetObj.type"
        >Расход</BaseInputRadio
      >
    </BaseRadioGroup>
    <BaseError
      v-if="budgetStore.createError"
      :message="budgetStore.createError"
    />
    <BaseButton
      class="budget-form__btn"
      type="submit"
      :disabled="(isSubmitted && isFormInvalid) || budgetStore.isCreating"
      >{{
        budgetStore.isCreating ? 'Сохранение...' : 'Добавить транзакцию'
      }}</BaseButton
    >
  </form>
</template>

<style scoped>
.budget-form {
  width: 100%;
}

.budget-form__title {
  margin: 0;
}

.budget-form__field {
  display: block;
  width: 50%;
}

.budget-form__text {
  margin: 0;
}

.budget-form__type {
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid #1a1a1e;
}

@media (max-width: 1023.98px) {
  .budget-form__field {
    width: 100%;
  }
}

@media (max-width: 575.98px) {
  .budget-form__title {
    font-size: 1.25rem;
  }
}
</style>
