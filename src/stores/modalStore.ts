import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref<boolean>(false);
  const currentView = ref<'auth' | 'transaction' | null>(null);

  const openModal = (modalType: 'auth' | 'transaction') => {
    currentView.value = modalType;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    openModal,
    closeModal,
    currentView,
  };
});
