<script setup lang="ts">
import BudgetBalance from '@/components/BudgetBalance.vue';
import BudgetForm from '@/components/BudgetForm.vue';
import BudgetHistory from '@/components/BudgetHistory.vue';
import type { Budget } from '@/types/budgetTypes';
import { computed, ref } from 'vue';

const transactions = ref<Budget[]>([]);

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
</script>

<template>
  <section class="container budget">
    <BudgetBalance :total="totalBalance" />
    <BudgetHistory :transactions="transactions" />
    <BudgetForm @add-transaction="updateTransactions" />
  </section>
</template>

<style scoped></style>
