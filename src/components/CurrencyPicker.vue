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
  if (currency === 'CNY') {
    return '¥';
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
        aria-label="Российский рубль"
        :model-value="props.currency"
        @update:model-value="emit('change-currency', $event as CurrencyType)"
        ><span aria-hidden="true">{{
          getCurrencyChar('RUB')
        }}</span></BaseInputRadio
      >
      <BaseInputRadio
        type="radio"
        name="currency"
        value="USD"
        aria-label="Доллар США"
        :model-value="props.currency"
        variant-action="base-radio"
        @update:model-value="emit('change-currency', $event as CurrencyType)"
        ><span aria-hidden="true">{{
          getCurrencyChar('USD')
        }}</span></BaseInputRadio
      >
      <BaseInputRadio
        type="radio"
        name="currency"
        value="EUR"
        aria-label="Евро"
        :model-value="props.currency"
        variant-action="base-radio"
        @update:model-value="emit('change-currency', $event as CurrencyType)"
        ><span aria-hidden="true">{{
          getCurrencyChar('EUR')
        }}</span></BaseInputRadio
      >
      <BaseInputRadio
        type="radio"
        name="currency"
        value="CNY"
        aria-label="Китайский юань"
        :model-value="props.currency"
        variant-action="base-radio"
        @update:model-value="emit('change-currency', $event as CurrencyType)"
        ><span aria-hidden="true">{{
          getCurrencyChar('CNY')
        }}</span></BaseInputRadio
      >
    </BaseRadioGroup>
  </div>
</template>

<style scoped>
.currency-title {
  margin: 0;
}

.currency-title__type {
  grid-template-columns: repeat(4, 1fr);
}
</style>
