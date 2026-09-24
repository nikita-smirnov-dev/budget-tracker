<script setup lang="ts">
import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';
</script>

<template>
  <form class="budget__form budget--card" data-form action="#" novalidate>
    <h2 class="budget__subtitle">Введите транзакцию</h2>
    <BaseInput
      class="budget__form-field"
      type="text"
      placeholder="Введите название"
      data-input-name
    />
    <BaseInput
      class="budget__form-field"
      type="number"
      placeholder="Введите сумму"
      data-input-sum
    />
    <p id="group-type" class="budget__form-text">Тип транзакции:</p>
    <div class="budget__form-type" aria-labelledby="group-type">
      <BaseInput
        class="budget__form-type-radio"
        input-class="budget__form-type-switch"
        type="radio"
        name="type"
        value="income"
        is-checked
        variant-action="radio"
        >Доход</BaseInput
      >
      <BaseInput
        class="budget__form-type-radio"
        input-class="budget__form-type-switch"
        type="radio"
        name="type"
        value="expense"
        variant-action="radio"
        >Расход</BaseInput
      >
    </div>
    <BaseButton class="budget__form-btn">Добавить транзакцию</BaseButton>
  </form>
</template>

<style scoped>
.budget__form {
  width: 100%;
}
.budget__form-field {
  display: block;
  width: 50%;
}

.budget__form-text {
  margin: 0;
}

.budget__form-type {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 20px;
  background: var(--surface-color);
}

.budget__form-type-radio {
  padding: 5px;
  width: 100%;
  text-align: center;
  background: transparent;
  cursor: pointer;
  color: var(--secondary-text-color);
  transition: color 0.3s ease-in-out;
}

.budget__form-type-radio:has(.budget__form-type-switch:focus-visible) {
  box-shadow: 0 0 0 2px var(--accent-color);
}

.budget__form-type-radio:not(:has(.budget__form-type-switch:checked)):hover {
  color: #f3f4f6;
}

.budget__form-type-radio:has(.budget__form-type-switch:checked) {
  color: #f3f4f6;
  background: var(--main-color);
  transition: background 0.3s ease-in-out;
}
</style>
