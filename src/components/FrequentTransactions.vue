<script setup lang="ts">
import { DEFAULT_TAGS } from '@/constants';
import type { ITags } from '@/types/tagsTypes';
import BaseButton from '@/UI/BaseButton.vue';
import BaseInput from '@/UI/BaseInput.vue';
import { BsPlus } from '@kalimahapps/vue-icons';
import { MdClose } from '@kalimahapps/vue-icons';
import { computed, ref, watch } from 'vue';

const newTagTitle = ref('');
const hasError = ref(false);

const tags = ref<ITags[]>(
  JSON.parse(
    localStorage.getItem('my-tags-list') || JSON.stringify(DEFAULT_TAGS),
  ),
);

const emit = defineEmits(['select-tag', 'title']);

const addNewTag = () => {
  if (tagErrorText.value !== '') {
    hasError.value = true;

    return;
  }

  const newTag = {
    id: Date.now().toString(),
    title: newTagTitle.value,
  };

  tags.value.push(newTag);

  hasError.value = false;
  newTagTitle.value = '';
};

const deleteTag = (id: string) => {
  tags.value = tags.value.filter((item) => item.id !== id);
};

const tagErrorText = computed(() => {
  const inputTag = newTagTitle.value.trim();

  if (inputTag === '') {
    return 'Название тега не может быть пустым';
  }

  if (inputTag.length > 15) {
    return 'Слишком длинное название (макс. 15 символов)';
  }

  if (tags.value.some((item) => item.title === inputTag)) {
    return 'Такой тег уже существует';
  }

  return '';
});

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
        class="frequent-transactions__field"
        placeholder="Введите название"
        v-model="newTagTitle"
        @keydown.enter.prevent="addNewTag"
        :is-error="hasError ? tagErrorText : ''"
        @focusin="hasError = false"
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
  color: var(--secondary-text-color);
}

.frequent-transactions__create {
  display: flex;
  align-items: center;
  gap: 16px;
}

.frequent-transactions__add-btn {
  padding: 9px;
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
  background: var(--tag-color);
}

.frequent-transactions__tag-btn {
  padding: 0;
  color: var(--main-text-color);
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
  background: var(--tag-hover-color);
}

.frequent-transactions__delete-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: var(--main-text-color);
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

@media (max-width: 1023.98px) {
  .frequent-transactions__field {
    width: 100%;
  }
}

@media (max-width: 575.98px) {
  .frequent-transactions__title {
    font-size: 1.25rem;
  }

  .frequent-transactions__descr,
  .frequent-transactions__info {
    font-size: 0.875rem;
  }
}
</style>
