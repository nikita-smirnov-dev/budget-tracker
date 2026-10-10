<script setup lang="ts">
import type { Budget } from '@/types/budgetTypes';
import type { CurrencyType } from '@/types/currencyTypes';
import BaseAmount from '@/UI/BaseAmount.vue';
import { AkTrashCan } from '@kalimahapps/vue-icons';

import { AkArrowUpRight } from '@kalimahapps/vue-icons';
import { AkArrowDownLeft } from '@kalimahapps/vue-icons';

const emit = defineEmits(['delete']);

const props = withDefaults(
  defineProps<{
    transaction: Budget;
    currency: CurrencyType;
  }>(),
  {
    currency: 'RUB',
  },
);
</script>

<template>
  <div class="budget-item__left">
    <AkArrowUpRight
      v-if="transaction.type === 'income'"
      class="budget-item__arrow-up"
    />

    <AkArrowDownLeft v-else class="budget-item__arrow-down" />
    <span class="budget-item__name">{{ transaction.title }}</span>
  </div>
  <div class="budget-item__right">
    <span class="budget-item__sum">
      <BaseAmount :value="transaction.amount" :currency="currency" />
    </span>
    <button
      class="budget-item__delete btn-reset"
      aria-label="Удалить"
      @click="$emit('delete', props.transaction.id)"
    >
      <AkTrashCan aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.budget-item__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.budget-item__arrow-up,
.budget-item__arrow-down {
  width: 20px;
  height: 20px;
}

.budget-item__arrow-up {
  color: var(--incomes-color);
}

.budget-item__arrow-down {
  color: var(--expense-color);
}

.budget-item__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.budget-item__name,
.budget-item__sum {
  font-weight: bold;
  font-size: 1.2rem;
}

.budget-item__delete {
  opacity: 0.3;
  color: var(--secondary-text-color);
  transition:
    color 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}

.budget-item__delete svg {
  width: 24px;
  height: 24px;
  stroke: currentcolor;
}

.budget-item__delete:hover {
  opacity: 1;
}

.budget-item__delete:active {
  color: #db1212;
}

@media (max-width: 575.98px) {
  .budget-item__right,
  .budget-item__left {
    gap: 6px;
  }

  .budget-item__name,
  .budget-item__sum {
    font-weight: bold;
    font-size: 1rem;
  }

  .budget-item__arrow-up,
  .budget-item__arrow-down {
    width: 16px;
    height: 16px;
  }

  .budget-item__delete svg {
    width: 18px;
    height: 18px;
  }
}
</style>
