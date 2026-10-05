<script setup lang="ts">
import BaseInputRadio from '@/UI/BaseInputRadio.vue';
import BaseRadioGroup from '@/UI/BaseRadioGroup.vue';

import type { CurrencyType } from '@/types/currencyTypes';

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
    <h2 id="currency-type" class="currency-title">Выберите валюту</h2>
    <BaseRadioGroup
      class="currency-title__type"
      aria-labelledby="currency-type"
    >
      <BaseInputRadio
        type="radio"
        name="currency"
        value="RUB"
        is-checked
        :model-value="props.currency"
        @update:model-value="emit('change-currency', $event as CurrencyType)"
        >{{ getCurrencyChar('RUB') }}</BaseInputRadio
      >
      <BaseInputRadio
        type="radio"
        name="currency"
        value="USD"
        :model-value="props.currency"
        @update:model-value="emit('change-currency', $event as CurrencyType)"
        >{{ getCurrencyChar('USD') }}</BaseInputRadio
      >
      <BaseInputRadio
        type="radio"
        name="currency"
        value="EUR"
        :model-value="props.currency"
        @update:model-value="emit('change-currency', $event as CurrencyType)"
        >{{ getCurrencyChar('EUR') }}</BaseInputRadio
      >
    </BaseRadioGroup>
  </div>
</template>

<style scoped>
.currency-title {
  margin: 0;
}

.currency-title__type {
  grid-template-columns: repeat(3, 1fr);
}
</style>
