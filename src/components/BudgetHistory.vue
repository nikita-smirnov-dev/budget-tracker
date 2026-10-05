<script setup lang="ts">
import BaseInput from '@/UI/BaseInput.vue';
import BudgetItem from './BudgetItem.vue';
import type { Budget } from '@/types/budgetTypes.ts';
import { toRef } from 'vue';
import { formatGroupDate } from '@/utils/formatGroupDate.ts';
import { useTransactionFilter } from '@/composables/useTransactionFilter.ts';
import { useTransactionGroups } from '@/composables/useTransactionGroups.ts';

const props = defineProps<{
  transactions: Budget[] | null;
}>();

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
      <div
        class="budget-history__actions-wrapper"
        aria-labelledby="group-filter"
      >
        <BaseInput
          class="budget-history__actions-radio"
          type="radio"
          name="filter"
          value="all"
          is-checked
          variant-action="radio"
          v-model="filterHistory.filter"
          >Все</BaseInput
        >
        <BaseInput
          class="budget-history__actions-radio"
          type="radio"
          name="filter"
          value="incomes"
          variant-action="radio"
          v-model="filterHistory.filter"
          >Доход</BaseInput
        >
        <BaseInput
          class="budget-history__actions-radio"
          type="radio"
          name="filter"
          value="expenses"
          variant-action="radio"
          v-model="filterHistory.filter"
          >Расход</BaseInput
        >
      </div>
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
}

.budget-history__actions-radio {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  color: var(--secondary-text-color);
  transition:
    color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

.budget-history__actions-radio:has(input[type='radio']:focus-visible) {
  box-shadow: 0 0 0 2px var(--accent-color);
}

.budget-history__actions-radio:not(:has(input[type='radio']:checked)):hover {
  color: #f3f4f6;
}

.budget-history__actions-radio input[type='radio'] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.budget-history__actions-radio:has(input[type='radio']:checked) {
  color: #f3f4f6;
  background: var(--main-color);
  transition: background 0.3s ease-in-out;
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
