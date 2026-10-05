<script setup lang="ts">
import { toRef } from 'vue';

import BudgetItem from './BudgetItem.vue';
import BaseRadioGroup from '@/UI/BaseRadioGroup.vue';
import BaseInputRadio from '@/UI/BaseInputRadio.vue';

import type { Budget } from '@/types/budgetTypes.ts';
import type { CurrencyType } from '@/types/currencyTypes';
import { useTransactionFilter } from '@/composables/useTransactionFilter.ts';
import { useTransactionGroups } from '@/composables/useTransactionGroups.ts';
import { formatGroupDate } from '@/utils/formatGroupDate.ts';

const props = withDefaults(
  defineProps<{
    transactions: Budget[] | null;
    currency: CurrencyType;
  }>(),
  {
    currency: 'RUB',
  },
);

const transactionsRef = toRef(props, 'transactions');
const emit = defineEmits(['delete-transaction']);

const { filterHistory, filteredTransactions } =
  useTransactionFilter(transactionsRef);

const { newTransactions } = useTransactionGroups(filteredTransactions);
</script>

<template>
  <div class="budget-history card">
    <h2 class="budget-history__title">История операций</h2>
    <div class="budget-history__actions" data-action-btns>
      <p id="group-filter" class="budget-history__actions-text">Фильтр:</p>
      <BaseRadioGroup
        class="budget-history__actions-wrapper"
        aria-labelledby="group-filter"
      >
        <BaseInputRadio
          class="budget-history__actions-radio"
          type="radio"
          name="filter"
          value="all"
          is-checked
          variant-action="base-filter"
          v-model="filterHistory.filter"
          >Все</BaseInputRadio
        >
        <BaseInputRadio
          class="budget-history__actions-radio"
          type="radio"
          name="filter"
          value="incomes"
          variant-action="base-filter"
          v-model="filterHistory.filter"
          >Доход</BaseInputRadio
        >
        <BaseInputRadio
          class="budget-history__actions-radio"
          type="radio"
          name="filter"
          value="expenses"
          variant-action="base-filter"
          v-model="filterHistory.filter"
          >Расход</BaseInputRadio
        >
      </BaseRadioGroup>
    </div>
    <ul
      v-if="filteredTransactions?.length > 0"
      class="budget-history__date-list list-reset"
    >
      <li
        class="budget-history__date-item"
        v-for="(dayTransactions, dateKey) in newTransactions"
      >
        <span class="budget-history__date-text">{{
          formatGroupDate(dateKey)
        }}</span>
        <ul class="budget-history__list list-reset">
          <li
            class="budget-history__item"
            v-for="item of dayTransactions"
            :key="item.id"
          >
            <BudgetItem
              :transaction="item"
              :currency="currency"
              @delete="$emit('delete-transaction', $event)"
            />
          </li>
        </ul>
      </li>
    </ul>
    <p v-else class="budget__descr">История операций пуста</p>
  </div>
</template>

<style scoped>
.budget-history {
  grid-row: span 2;
  height: calc(100vh - 290px);
}

.budget-history__title {
  margin: 0;
}

.budget-history__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 45%;
  margin-bottom: 20px;
  padding: 5px 8px;
  border-radius: 8px;
  background: var(--surface-color);
}

.budget-history__actions-text {
  margin: 0;
  color: var(--secondary-text-color);
  font-size: 1.1rem;
}

.budget-history__actions-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 0;
}

.budget-history__date-list {
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
  overflow-y: auto;
  padding: 0 10px;
}

.budget-history__date-list::-webkit-scrollbar {
  width: 6px;
}

.budget-history__date-list::-webkit-scrollbar-track {
  background: transparent;
}

.budget-history__date-list::-webkit-scrollbar-thumb {
  background-color: #444444;
  border-radius: 10px;
}

.budget-history__date-list::-webkit-scrollbar-thumb:hover {
  background-color: #555555;
}

.budget-history__date-item {
  padding: 10px;
  border-radius: 8px;
  background: var(--surface-color);
}

.budget-history__date-text {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 1.1rem;
  letter-spacing: 0.8px;
}

.budget-history__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
}

.budget-history__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  background: var(--main-color);
}

.budget__descr {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin: 0;
  color: var(--secondary-text-color);
  font-size: 1.1rem;
}
</style>
