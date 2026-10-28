import { API_BASE_URL } from '@/constants';
import {
  BaseBudgetSchema,
  BudgetListSchema,
  type Budget,
} from '@/types/budgetTypes';

export const fetchLoadTransaction = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);

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

export const fetchUpdateTransactions = async (transaction: Budget) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
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

export const fetchDeleteTransaction = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

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
