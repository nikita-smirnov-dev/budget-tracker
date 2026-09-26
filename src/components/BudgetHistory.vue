<script setup lang="ts">
import BaseInput from '@/UI/BaseInput.vue';
import BudgetItem from './BudgetItem.vue';
import type { Budget, FilterHistory } from '@/types/budgetTypes.ts';
import { computed, ref } from 'vue';

const props = defineProps<{
  transactions: Budget[] | null;
}>();

const filterHistory = ref<FilterHistory>({
  filter: 'all',
});

const filteredTransactions = computed(() => {
  if (filterHistory.value.filter === 'all') {
    return props.transactions || [];
  } else if (filterHistory.value.filter === 'incomes') {
    return props.transactions?.filter((item) => item.type === 'income') || [];
  } else if (filterHistory.value.filter === 'expenses') {
    return props.transactions?.filter((item) => item.type === 'expense') || [];
  } else {
    const _: never = filterHistory.value.filter;
    throw new Error();
  }
});
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
      class="budget-history__list list-reset"
      data-history-list
    >
      <li
        class="budget-history__item"
        v-for="item of filteredTransactions"
        :key="item.id"
      >
        <BudgetItem :transaction="item" />
      </li>
    </ul>
    <p v-else class="budget__descr">История операций пуста</p>
  </div>
</template>

<style scoped>
.budget-history {
  grid-row: span 2;
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
