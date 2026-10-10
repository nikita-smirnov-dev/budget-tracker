<script setup lang="ts">
import type { CurrencyType } from '@/types/currencyTypes';
import BaseAmount from '@/UI/BaseAmount.vue';

const props = withDefaults(
  defineProps<{
    total: number;
    currency: CurrencyType;
  }>(),
  {
    currency: 'RUB',
  },
);
</script>

<template>
  <div class="budget-balance card">
    <h1 class="budget-balance__title">Ваш Баланс</h1>
    <div class="budget-balance__info" data-balance>
      <BaseAmount :value="total" :currency="currency" />
    </div>
  </div>
</template>

<style scoped>
.budget-balance__title {
  margin: 0;
}

.budget-balance__info {
  margin-bottom: 10px;
  font-size: 1.4rem;
  font-weight: bold;
}

@media (max-width: 575.98px) {
  .budget-balance__title {
    font-size: 1.6rem;
  }

  .budget-balance__info {
    margin-bottom: 10px;
    font-size: 1.4rem;
  }
}
</style>
