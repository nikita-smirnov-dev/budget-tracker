<script setup lang="ts">
import { AkTrashCan } from '@kalimahapps/vue-icons';
</script>

<template>
  <li class="budget-item">
    <div class="budget-item__left">
      <span class="budget-item__name">budget</span>
    </div>
    <div class="budget-item__right">
      <span class="budget-item__sum">10</span>
      <button
        class="budget-item__delete btn-reset"
        data-delete-id="${item.id}"
        aria-label="Удалить"
      >
        <AkTrashCan aria-hidden="true" />
      </button>
    </div>
  </li>
</template>

<style scoped>
.budget-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  background: var(--main-color);
}

.budget-item__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.budget-item__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.budget-item__name,
.budget-item__sum {
  font-weight: bold;
  font-size: 1.2rem;
}

.budget-item__delete {
  opacity: 0.3;
  color: var(--secondary-text-color);
  transition:
    color 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}

.budget-item__delete svg {
  width: 24px;
  height: 24px;
  stroke: currentcolor;
}

.budget-item__delete:hover {
  opacity: 1;
}

.budget-item__delete:active {
  color: #db1212;
}
</style>
