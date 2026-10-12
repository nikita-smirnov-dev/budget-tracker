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
    <div class="budget-balance__info">
      <BaseAmount
        :value="total"
        :currency="currency"
        :class="{ 'budget-balance__negative ': total < 0 }"
      />
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

.budget-balance__negative {
  color: var(--color-error);
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
