<script setup lang="ts">
import BudgetBalance from '@/components/BudgetBalance.vue';
import BudgetForm from '@/components/BudgetForm.vue';
import BudgetHistory from '@/components/BudgetHistory.vue';
import type { Budget } from '@/types/budgetTypes';
import { ref } from 'vue';

const transactions = ref<Budget[]>([
  {
    id: Date.now().toString(),
    title: 'Products',
    amount: 5000,
    type: 'income',
  },
  {
    id: Date.now().toString(),
    title: 'Products',
    amount: 5000,
    type: 'expense',
  },
]);
</script>

<template>
  <section class="container budget">
    <BudgetBalance />
    <BudgetHistory :transactions="transactions" />
    <BudgetForm />
  </section>
</template>

<style scoped></style>
