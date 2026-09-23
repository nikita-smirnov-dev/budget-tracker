<script setup lang="ts">
import BudgetBalance from '@/components/BudgetBalance.vue';
import BudgetForm from '@/components/BudgetForm.vue';
import BudgetHistory from '@/components/BudgetHistory.vue';
</script>

<template>
  <section class="container budget">
    <BudgetBalance />
    <BudgetHistory />
    <BudgetForm />
  </section>
</template>

<style scoped></style>
