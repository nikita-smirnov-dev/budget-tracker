<script setup lang="ts">
import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';
import { BsPlus } from '@kalimahapps/vue-icons';
import { MdClose } from '@kalimahapps/vue-icons';
</script>

<template>
  <div class="frequent-transactions card">
    <h2 class="frequent-transactions__title">Частые транзакции</h2>
    <p class="frequent-transactions__descr">
      Создайте шаблоны для частых операций. Кликните по готовой плашке, чтобы
      мгновенно заполнить поле названия в форме ввода
    </p>
    <div class="frequent-transactions__create">
      <BaseInput placeholder="Введите название" />
      <BaseButton
        type="button"
        class="frequent-transactions__add-btn"
        aria-label="Добавить тег"
      >
        <BsPlus class="frequent-transactions__icon-add" aria-hidden="true" />
      </BaseButton>
    </div>
    <ul class="frequent-transactions__list list-reset">
      <li class="frequent-transactions__item">
        <BaseButton
          type="button"
          class="frequent-transactions__tag-btn btn-reset"
          variant-action="secondary"
        >
          Продукты
        </BaseButton>

        <BaseButton
          type="button"
          class="frequent-transactions__delete-btn btn-reset"
          variant-action="icon"
          aria-label="Удалить тег"
        >
          <MdClose
            class="frequent-transactions__icon-delete"
            aria-hidden="true"
          />
        </BaseButton>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.frequent-transactions__title {
  margin: 0;
}

.frequent-transactions__descr {
  margin: 0;
}
.frequent-transactions__create {
  display: flex;
  align-items: center;
  gap: 16px;
}

.frequent-transactions__add-btn {
  padding: 8px;
}

.frequent-transactions__icon-add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.frequent-transactions__item {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 10px 12px;
  border-radius: 50px;
  background: var(--surface-color);
}

.frequent-transactions__tag-btn {
  padding: 0;
}

.frequent-transactions__tag-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  transition: background 0.3s ease-in-out;
}

.frequent-transactions__tag-btn:hover::after {
  background: rgba(255, 255, 255, 0.05);
}

.frequent-transactions__delete-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 2;
  opacity: 0.5;
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;
}

.frequent-transactions__delete-btn:hover {
  transform: scale(1.1);
  opacity: 1;
}

.frequent-transactions__item:has(.frequent-transactions__delete-btn:hover)
  .frequent-transactions__tag-btn::after {
  background: transparent;
}

.frequent-transactions__icon-delete {
  width: 20px;
  height: 20px;
}
</style>
