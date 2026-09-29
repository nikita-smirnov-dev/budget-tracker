<script setup lang="ts">
import BudgetBalance from '@/components/BudgetBalance.vue';
import BudgetForm from '@/components/BudgetForm.vue';
import BudgetHistory from '@/components/BudgetHistory.vue';
import FrequentTransactions from '@/components/FrequentTransactions.vue';
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
    <div class="budget__left">
      <BudgetBalance :total="totalBalance" />
      <FrequentTransactions />
      <BudgetForm @add-transaction="updateTransactions" />
    </div>
    <BudgetHistory
      :transactions="transactions"
      @delete-transaction="deleteTransaction"
    />
  </section>
</template>

<style scoped>
.budget {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: start;
  gap: 16px;
  padding: 40px 0;
}

.budget__left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
