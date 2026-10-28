import type { ITags } from '@/types/tagsTypes';

export const DEFAULT_TAGS: ITags[] = [
  { id: '1', title: 'Продукты' },
  { id: '2', title: 'Телефон' },
  { id: '3', title: 'Топливо' },
  { id: '4', title: 'Интернет' },
  { id: '5', title: 'Зарплата' },
];

export const API_BASE_URL = 'http://localhost:3000/api/transaction';
