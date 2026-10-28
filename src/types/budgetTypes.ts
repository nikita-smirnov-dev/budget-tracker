import z from 'zod';

const transactionTypeSchema = z.enum(['income', 'expense']);

export type TransactionType = z.infer<typeof transactionTypeSchema>;

export const BaseBudgetSchema = z.object({
  createdAt: z.number(),
  id: z.string(),
  title: z.string(),
  amount: z.number(),
  type: transactionTypeSchema,
});

export type Budget = z.infer<typeof BaseBudgetSchema>;

export const BudgetListSchema = z.array(BaseBudgetSchema);

export type BudgetList = z.infer<typeof BudgetListSchema>;

export type FilterType = 'all' | 'incomes' | 'expenses';

export interface FilterHistory {
  filter: FilterType;
}
