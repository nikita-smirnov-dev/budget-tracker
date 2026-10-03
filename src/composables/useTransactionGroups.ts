import type { Budget } from '@/types/budgetTypes';
import { computed, type Ref } from 'vue';

export function useTransactionGroups(filteredTransactions: Ref<Budget[]>) {
  const newTransactions = computed(() => {
    return filteredTransactions.value.reduce(
      (acc, item) => {
        if (!acc[item.createdAt]) {
          acc[item.createdAt] = [];
        }
        acc[item.createdAt].push(item);
        return acc;
      },
      {} as Record<number, Budget[]>,
    );
  });
  return {
    newTransactions,
  };
}
