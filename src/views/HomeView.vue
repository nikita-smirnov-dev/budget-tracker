<script setup lang="ts">
import BudgetBalance from '@/components/BudgetBalance.vue';
import BudgetForm from '@/components/BudgetForm.vue';
import BudgetHistory from '@/components/BudgetHistory.vue';
import CurrencyPicker from '@/components/CurrencyPicker.vue';
import FrequentTransactions from '@/components/FrequentTransactions.vue';
import type { Budget } from '@/types/budgetTypes';
import type { CurrencyType } from '@/types/currencyTypes';
import { computed, ref, watch } from 'vue';

const formTitle = ref('');
const currentCurrency = ref<CurrencyType>(
  (localStorage.getItem('my-budget-currency') as CurrencyType) || 'RUB',
);

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

const handleSelectTag = (title: string) => {
  formTitle.value = title;
};

const handleCurrencyChange = (value: CurrencyType) => {
  currentCurrency.value = value;
};

watch(
  transactions,
  (newValues) => {
    localStorage.setItem('my-budget-list', JSON.stringify(newValues));
  },
  { deep: true },
);

watch(currentCurrency, (newCurrency) => {
  localStorage.setItem('my-budget-currency', newCurrency);
});
</script>

<template>
  <section class="container budget">
    <div class="budget__left">
      <BudgetBalance :total="totalBalance" :currency="currentCurrency" />
      <CurrencyPicker
        :currency="currentCurrency"
        @change-currency="handleCurrencyChange"
      />
      <FrequentTransactions @select-tag="handleSelectTag" />
      <BudgetForm
        @add-transaction="updateTransactions"
        :selected-title="formTitle"
      />
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
