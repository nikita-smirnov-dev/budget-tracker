export type TransactionType = 'income' | 'expense';

export interface Budget {
  id?: string;
  title?: string;
  amount?: number;
  type?: TransactionType;
}
