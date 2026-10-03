import type { Budget, FilterHistory } from '@/types/budgetTypes';
import { ref, computed, type Ref } from 'vue';

export function useTransactionFilter(transactions: Ref<Budget[] | null>) {
  const filterHistory = ref<FilterHistory>({
    filter: 'all',
  });

  const filteredTransactions = computed(() => {
    const currentFilter = filterHistory.value.filter;
    const list = transactions.value || [];

    if (currentFilter === 'all') {
      return list;
    } else if (currentFilter === 'incomes') {
      return list.filter((item) => item.type === 'income') || [];
    } else if (currentFilter === 'expenses') {
      return list.filter((item) => item.type === 'expense') || [];
    } else {
      const _: never = currentFilter;
      throw new Error(`Unexpected value: ${_}`);
    }
  });
  return {
    filterHistory,
    filteredTransactions,
  };
}
