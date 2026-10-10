<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { BsPlus } from '@kalimahapps/vue-icons';

import BudgetBalance from '@/components/BudgetBalance.vue';
import BudgetForm from '@/components/BudgetForm.vue';
import BudgetHistory from '@/components/BudgetHistory.vue';
import CurrencyPicker from '@/components/CurrencyPicker.vue';
import FrequentTransactions from '@/components/FrequentTransactions.vue';
import BaseButton from '@/UI/BaseButton.vue';
import Modal from '@/components/Modal.vue';

import type { Budget } from '@/types/budgetTypes';
import type { CurrencyType } from '@/types/currencyTypes';

const formTitle = ref('');
const isOpen = ref(false);

const handleOpenModal = () => {
  isOpen.value = true;
};

const handleCloseModal = () => {
  isOpen.value = false;
};

const currentCurrency = ref<CurrencyType>(
  (localStorage.getItem('my-budget-currency') as CurrencyType) || 'RUB',
);

const transactions = ref<Budget[]>(
  JSON.parse(localStorage.getItem('my-budget-list') || '[]'),
);

const updateTransactions = (transaction: Budget) => {
  transactions.value.push(transaction);

  if (isOpen.value) {
    handleCloseModal();
  }
};

const totalBalance = computed(() => {
  const total = transactions.value.reduce((acc, item) => {
    if (item.type === 'income') {
      acc += item.amount;
    }
    if (item.type === 'expense') {
      acc -= item.amount;
    }
    return acc;
  }, 0);
  return total;
});

const deleteTransaction = (id: string) => {
  transactions.value = transactions.value.filter((item) => item.id !== id);
};

const handleSelectTag = (title: string) => {
  formTitle.value = title;
};

const handleCurrencyChange = (value: CurrencyType) => {
  currentCurrency.value = value;
};

watch(
  transactions,
  (newValues) => {
    localStorage.setItem('my-budget-list', JSON.stringify(newValues));
  },
  { deep: true },
);

watch(currentCurrency, (newCurrency) => {
  localStorage.setItem('my-budget-currency', newCurrency);
});
</script>

<template>
  <section class="container budget">
    <div class="budget__column">
      <BudgetBalance :total="totalBalance" :currency="currentCurrency" />
      <CurrencyPicker
        class="budget-currency__mobile"
        :currency="currentCurrency"
        name="mobile-currency"
        @change-currency="handleCurrencyChange"
      />
      <BudgetHistory
        :transactions="transactions"
        :currency="currentCurrency"
        @delete-transaction="deleteTransaction"
      />
    </div>
    <div class="budget__column budget__column--hidden">
      <CurrencyPicker
        :currency="currentCurrency"
        name="desktop-currency"
        @change-currency="handleCurrencyChange"
      />
      <FrequentTransactions @select-tag="handleSelectTag" />
      <BudgetForm
        @add-transaction="updateTransactions"
        :selected-title="formTitle"
      />
    </div>
    <BaseButton
      class="open-modal"
      aria-label="откроыть форму добавления транзакции"
      @click="handleOpenModal"
      ><BsPlus class="open-modal__icon" aria-hidden="true"
    /></BaseButton>
    <Modal v-if="isOpen" @close="handleCloseModal">
      <div class="budget-modal">
        <BudgetForm
          class="budget-modal__card"
          @add-transaction="updateTransactions"
          :selected-title="formTitle"
        />
        <FrequentTransactions
          class="budget-modal__card"
          @select-tag="handleSelectTag"
        />
      </div>
    </Modal>
  </section>
</template>

<style scoped>
.budget {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: start;
  gap: 16px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.budget-currency__mobile {
  display: none;
}

.budget__column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.open-modal {
  position: fixed;
  right: 20px;
  bottom: 40px;
  display: none;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 0;
  border-radius: 8px;
  z-index: 10;
}

.open-modal__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

@media (max-width: 1023.98px) {
  .budget {
    grid-template-columns: 1.5fr 1fr;
  }
}

@media (max-width: 767.98px) {
  .budget {
    grid-template-columns: 1fr;
  }

  .budget-currency__mobile {
    display: flex;
  }

  .budget__column--hidden {
    display: none;
  }

  .open-modal {
    display: flex;
  }

  .budget-modal {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;
    border-radius: 8px;
    background: var(--card-bg-color);
  }

  .budget-modal__card {
    padding: 0;
    background: transparent;
    border-radius: 0;
  }
}

@media (max-width: 575.98px) {
  .budget {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
