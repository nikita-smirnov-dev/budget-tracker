import type { Budget } from '@/types/budgetTypes';
import { computed, type Ref } from 'vue';

export function useTransactionGroups(filteredTransactions: Ref<Budget[]>) {
  const newTransactions = computed(() => {
    const grouped = filteredTransactions.value.reduce(
      (acc, item) => {
        if (!acc[item.createdAt]) {
          acc[item.createdAt] = [];
        }
        acc[item.createdAt].push(item);
        return acc;
      },
      {} as Record<number, Budget[]>,
    );

    const sortedTimestamps = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => b - a);

    const sortedGrouped = {} as Record<number, Budget[]>;

    for (const timestamp of sortedTimestamps) {
      sortedGrouped[timestamp] = grouped[timestamp].reverse();
    }

    return sortedGrouped;
  });
  return {
    newTransactions,
  };
}
