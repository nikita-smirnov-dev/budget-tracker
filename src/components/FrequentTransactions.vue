<script setup lang="ts">
import type { ITags } from '@/types/tagsTypes';
import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';
import { BsPlus } from '@kalimahapps/vue-icons';
import { MdClose } from '@kalimahapps/vue-icons';
import { ref, watch } from 'vue';

const newTagTitle = ref('');

const defaultTags: ITags[] = [
  { id: '1', title: 'Продукты' },
  { id: '2', title: 'Телефон' },
  { id: '3', title: 'Топливо' },
  { id: '4', title: 'Интернет' },
  { id: '5', title: 'Зарплата' },
];

const tags = ref<ITags[]>(
  JSON.parse(
    localStorage.getItem('my-tags-list') || JSON.stringify(defaultTags),
  ),
);

const emit = defineEmits(['select-tag', 'title']);

const addNewTag = () => {
  if (newTagTitle.value.trim() === '') return;

  const newTag = {
    id: Date.now().toString(),
    title: newTagTitle.value,
  };

  tags.value.push(newTag);

  newTagTitle.value = '';
};

const deleteTag = (id: string) => {
  tags.value = tags.value.filter((item) => item.id !== id);
};

watch(
  tags,
  (newValues) => {
    localStorage.setItem('my-tags-list', JSON.stringify(newValues));
  },
  { deep: true },
);
</script>

<template>
  <div class="frequent-transactions card">
    <h2 class="frequent-transactions__title">Частые транзакции</h2>
    <p class="frequent-transactions__descr">
      Создайте шаблоны для частых операций. Кликните по готовой плашке, чтобы
      мгновенно заполнить поле названия в форме ввода
    </p>
    <div class="frequent-transactions__create">
      <BaseInput
        placeholder="Введите название"
        v-model="newTagTitle"
        @keydown.enter.prevent="addNewTag"
      />
      <BaseButton
        type="button"
        class="frequent-transactions__add-btn"
        aria-label="Добавить тег"
        @click="addNewTag"
      >
        <BsPlus class="frequent-transactions__icon-add" aria-hidden="true" />
      </BaseButton>
    </div>
    <ul class="frequent-transactions__list list-reset" v-if="tags.length > 0">
      <li
        class="frequent-transactions__item"
        v-for="item of tags"
        :key="item.id"
      >
        <BaseButton
          type="button"
          class="frequent-transactions__tag-btn btn-reset"
          variant-action="secondary"
          @click="emit('select-tag', item.title)"
        >
          {{ item.title }}
        </BaseButton>

        <BaseButton
          type="button"
          class="frequent-transactions__delete-btn btn-reset"
          variant-action="icon"
          aria-label="Удалить тег"
          @click="deleteTag(item.id)"
        >
          <MdClose
            class="frequent-transactions__icon-delete"
            aria-hidden="true"
          />
        </BaseButton>
      </li>
    </ul>
    <p v-else class="frequent-transactions__info">
      Готовые шаблоны отсутствуют
    </p>
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

.frequent-transactions__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.frequent-transactions__item {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 14px;
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

.frequent-transactions__info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin: 0;
  color: var(--secondary-text-color);
  font-size: 1.1rem;
}
</style>
