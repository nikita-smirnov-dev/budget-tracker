<script setup lang="ts">
import BudgetBalance from '@/components/BudgetBalance.vue';
import BudgetForm from '@/components/BudgetForm.vue';
import BudgetHistory from '@/components/BudgetHistory.vue';
import type { Budget } from '@/types/budgetTypes';
import { computed, ref, watch } from 'vue';

const transactions = ref<Budget[]>(
  JSON.parse(localStorage.getItem('my-budget-list') || '[]'),
);

const updateTransactions = (transaction: Budget) => {
  transactions.value.push(transaction);
};

const totalBalance = computed(() => {
  const total = transactions.value.reduce((acc, item) => {
    if (item.type === 'income') {
      acc += item.amount;
    }
    if (item.type === 'expense') {
      acc -= item.amount;
    }
    return acc;
  }, 0);
  return total;
});

const deleteTransaction = (id: string) => {
  transactions.value = transactions.value.filter((item) => item.id !== id);
};

watch(
  transactions,
  (newValues) => {
    localStorage.setItem('my-budget-list', JSON.stringify(newValues));
  },
  { deep: true },
);
</script>

<template>
  <section class="container budget">
    <BudgetBalance :total="totalBalance" />
    <BudgetHistory
      :transactions="transactions"
      @delete-transaction="deleteTransaction"
    />
    <BudgetForm @add-transaction="updateTransactions" />
  </section>
</template>

<style scoped></style>
