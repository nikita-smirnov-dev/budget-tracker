<script setup lang="ts">
import type { TransactionType } from '@/types/budgetTypes';
import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';
import { ref } from 'vue';

const emit = defineEmits(['add-transaction']);

const budgetObj = ref({
  title: '',
  amount: null as number | null,
  type: 'income' as TransactionType,
});

const sendForm = () => {
  const id = Date.now().toString();
  const newTransaction = {
    ...budgetObj.value,
    id,
    amount: budgetObj.value.amount || 0,
  };
  emit('add-transaction', newTransaction);
  budgetObj.value = {
    title: '',
    amount: null,
    type: 'income',
  };
};
</script>

<template>
  <form class="budget-form card" @submit.prevent="sendForm">
    <h2 class="budget-form__title">Введите транзакцию</h2>
    <BaseInput
      class="budget-form__field"
      type="text"
      placeholder="Введите название"
      v-model="budgetObj.title"
    />
    <BaseInput
      class="budget-form__field"
      type="number"
      placeholder="Введите сумму"
      v-model.number="budgetObj.amount"
    />
    <p id="group-type" class="budget-form__text">Тип транзакции:</p>
    <div class="budget-form__type" aria-labelledby="group-type">
      <BaseInput
        class="budget-form__type-radio"
        type="radio"
        name="type"
        value="income"
        is-checked
        variant-action="radio"
        v-model="budgetObj.type"
        >Доход</BaseInput
      >
      <BaseInput
        class="budget-form__type-radio"
        type="radio"
        name="type"
        value="expense"
        variant-action="radio"
        v-model="budgetObj.type"
        >Расход</BaseInput
      >
    </div>
    <BaseButton class="budget-form__btn" type="submit"
      >Добавить транзакцию</BaseButton
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 20px;
  background: var(--surface-color);
}

.budget-form__type-radio {
  padding: 5px;
  width: 100%;
  text-align: center;
  background: transparent;
  cursor: pointer;
  color: var(--secondary-text-color);
  transition: color 0.3s ease-in-out;
}

.budget-form__type-radio:has(input[type='radio']:focus-visible) {
  box-shadow: 0 0 0 2px var(--accent-color);
}

.budget-form__type-radio:not(:has(input[type='radio']:checked)):hover {
  color: #f3f4f6;
}

.budget-form__type-radio:has(input[type='radio']:checked) {
  color: #f3f4f6;
  background: var(--main-color);
  transition: background 0.3s ease-in-out;
}
</style>
