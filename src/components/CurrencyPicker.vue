<script setup lang="ts">
import type { CurrencyType } from '@/types/currencyTypes';
import BaseInput from '@/UI/BaseInput.vue';

const emit = defineEmits<{
  (e: 'change-currency', value: CurrencyType): void;
}>();

const props = withDefaults(
  defineProps<{
    currency: CurrencyType;
  }>(),
  {
    currency: 'RUB',
  },
);

function getCurrencyChar(currency: CurrencyType): string | never {
  if (currency === 'RUB') {
    return '₽';
  }
  if (currency === 'USD') {
    return '$';
  }
  if (currency === 'EUR') {
    return '€';
  }
  const _: never = currency;
  throw new Error(`Unexpected value: ${_}`);
}
</script>

<template>
  <div class="currency card">
    <h2 class="currency-title">Выберите валюту</h2>
    <div class="budget-form__type" aria-labelledby="group-type">
      <BaseInput
        class="budget-form__type-radio"
        type="radio"
        name="type"
        value="RUB"
        is-checked
        :model-value="props.currency"
        @update:model-value="emit('change-currency', $event as CurrencyType)"
        variant-action="radio"
        >{{ getCurrencyChar('RUB') }}</BaseInput
      >
      <BaseInput
        class="budget-form__type-radio"
        type="radio"
        name="type"
        value="USD"
        :model-value="props.currency"
        @update:model-value="emit('change-currency', $event as CurrencyType)"
        variant-action="radio"
        >{{ getCurrencyChar('USD') }}</BaseInput
      >
      <BaseInput
        class="budget-form__type-radio"
        type="radio"
        name="type"
        value="EUR"
        :model-value="props.currency"
        @update:model-value="emit('change-currency', $event as CurrencyType)"
        variant-action="radio"
        >{{ getCurrencyChar('EUR') }}</BaseInput
      >
    </div>
  </div>
</template>

<style scoped>
.currency-title {
  margin: 0;
}

.budget-form__type {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
