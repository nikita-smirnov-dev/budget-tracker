import {
  fetchDeleteTransaction,
  fetchLoadTransaction,
  fetchUpdateTransactions,
} from '@/api/transactions';
import type { Budget, BudgetList } from '@/types/budgetTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBudgetStore = defineStore('budget', () => {
  const transactions = ref<BudgetList>([]);
  const isLoading = ref(false);
  const isCreating = ref(false);
  const error = ref<string | null>(null);
  const createError = ref<string | null>(null);
  const deleteError = ref<string | null>(null);
  const deletingId = ref<string | null>(null);

  const loadTransaction = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await fetchLoadTransaction();
      transactions.value = data;
    } catch (err) {
      console.error(err);
      error.value = 'Не удалось загрузить транзакции. Попробуйте позже.';
    } finally {
      isLoading.value = false;
    }
  };

  const updateTransactions = async (transaction: Budget) => {
    isCreating.value = true;
    createError.value = null;

    try {
      await fetchUpdateTransactions(transaction);

      transactions.value.push(transaction);
    } catch (err) {
      console.error(err);
      createError.value = 'Не удалось создать транзакцию. Попробуйте позже.';
    } finally {
      isCreating.value = false;
    }
  };

  const deleteTransaction = async (id: string) => {
    error.value = null;
    deletingId.value = id;

    try {
      await fetchDeleteTransaction(id);
      transactions.value = transactions.value.filter((item) => item.id !== id);
    } catch (err) {
      console.error(err);
      deleteError.value = 'Не удалось удалить транзакцию. Попробуйте позже.';
    } finally {
      deletingId.value = null;
    }
  };

  return {
    isLoading,
    isCreating,
    transactions,
    loadTransaction,
    updateTransactions,
    deleteTransaction,
    error,
    deletingId,
    createError,
  };
});
