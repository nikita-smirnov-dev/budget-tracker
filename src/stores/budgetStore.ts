import {
  fetchDeleteTransaction,
  fetchLoadTransaction,
  fetchUpdateTransactions,
} from '@/api/transactions';
import type { Budget, BudgetList } from '@/types/budgetTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToastStore } from './toastStore';

export const useBudgetStore = defineStore('budget', () => {
  const toastStore = useToastStore();
  const transactions = ref<BudgetList>([]);
  const isLoading = ref(false);
  const isCreating = ref(false);
  const error = ref<string | null>(null);

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

    try {
      await fetchUpdateTransactions(transaction);

      transactions.value.push(transaction);
    } catch (err) {
      console.error(err);
      toastStore.addToast({
        message: 'Не удалось создать транзакцию',
        type: 'error',
      });
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
      toastStore.addToast({
        message: 'Транзакция успешно удалена',
        type: 'success',
      });
    } catch (err) {
      console.error(err);
      toastStore.addToast({
        message: 'Не удалось удалить транзакцию',
        type: 'error',
      });
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
  };
});
