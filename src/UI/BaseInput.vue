<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isChecked?: boolean;
    placeholder?: string;
    type?: string;
    value?: string;
    name?: string;
    inputClass?: string;
    modelValue: string | number | null;
    variantAction?: 'base-input' | 'radio';
    isError?: string;
  }>(),
  {
    isChecked: false,
    inputClass: '',
    variantAction: 'base-input',
    modelValue: '',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();
</script>

<template>
  <label>
    <div :class="{ 'input-error': isError }">
      <input
        :class="[
          'input-reset',
          inputClass,
          { 'base-input': variantAction === 'base-input' },
          { 'input--radio': variantAction === 'radio' },
        ]"
        :type="type"
        :placeholder="placeholder"
        :value="type === 'radio' ? value : modelValue"
        :name="name"
        :checked="type === 'radio' ? modelValue === value : isChecked"
        @input="
          $emit(
            'update:modelValue',
            type === 'radio'
              ? ($event.target as HTMLInputElement).value
              : ($event.target as HTMLInputElement).value,
          )
        "
      />
      <slot></slot>
    </div>
    <span v-if="isError" class="error-text">{{ isError }}</span>
  </label>
</template>

<style scoped>
.input-reset {
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  outline: none;
}

.base-input {
  width: 100%;
  border: 1px solid transparent;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--main-color);
}

.base-input::placeholder {
  color: var(--secondary-text-color);
}

.input--radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

input::-ms-clear,
input::-ms-reveal {
  display: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-error .base-input {
  border-color: var(--color-error);
}

.input-error:hover {
  border-color: var(--color-error);
}

.input-error:hover :deep(svg) {
  color: var(--color-error);
}

.error-text {
  display: block;
  margin-top: 4px; /* Небольшой отступ сверху */
  font-size: 0.8rem;
  color: var(--color-error); /* Делает текст ошибки чуть помельче */
}
</style>
