import type { Budget, TransactionType } from '@/types/budgetTypes';

export const createTransaction = (
  title: string,
  amount: number,
  type: TransactionType,
): Budget => {
  return {
    id: Date.now().toString(),
    createdAt: new Date().setHours(0, 0, 0, 0),
    title,
    amount,
    type,
  };
};
