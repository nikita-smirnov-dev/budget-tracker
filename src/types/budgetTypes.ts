export type TransactionType = 'income' | 'expense';

export interface Budget {
  createdAt: number;
  id?: string;
  title: string;
  amount: number;
  type: TransactionType;
}

export type FilterType = 'all' | 'incomes' | 'expenses';

export interface FilterHistory {
  filter: FilterType;
}
