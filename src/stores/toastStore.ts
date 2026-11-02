import type { IToast } from '@/types/toastTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<IToast[]>([]);

  const addToast = ({ message, type }: Omit<IToast, 'id'>) => {
    const newToast = {
      id: Date.now().toString(),
      message: message,
      type: type,
    };
    toasts.value.push(newToast);

    setTimeout(() => {
      toasts.value = toasts.value.filter((item) => item.id !== newToast.id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((item) => item.id !== id);
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
});
