import { API_BASE_URL, ENDPOINTS } from '@/constants';
import {
  BaseBudgetSchema,
  BudgetListSchema,
  type Budget,
  type BudgetList,
} from '@/types/budgetTypes';

export const fetchLoadTransaction = async (): Promise<BudgetList> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.transaction}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return BudgetListSchema.parse(data);
  } catch (error) {
    console.error('Нет данных в ответе от API:', error);
    throw error;
  }
};

export const fetchUpdateTransactions = async (
  transaction: Budget,
): Promise<Budget> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.transaction}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return BaseBudgetSchema.parse(data);
  } catch (error) {
    console.error('Add new transaction fetch error:', error);
    throw error;
  }
};

export const fetchDeleteTransaction = async (id: string): Promise<Budget> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${ENDPOINTS.transaction}/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return BaseBudgetSchema.parse(data);
  } catch (error) {
    console.error('Delete transaction fetch error:', error);
    throw error;
  }
};
