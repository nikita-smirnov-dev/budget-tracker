<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder?: string;
    type?: string;
    value?: string;
    name?: string;
    inputClass?: string;
    modelValue?: string | number | null;
    isError?: string;
    step?: string;
  }>(),
  {
    inputClass: '',
    modelValue: '',
    step: '',
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
        :class="['input-reset', inputClass, 'base-input']"
        :type="type"
        :step="step"
        :placeholder="placeholder"
        :value="modelValue"
        :name="name"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
      <slot></slot>
    </div>
    <span v-if="isError" class="error-text">{{ isError }}</span>
  </label>
</template>

<style scoped>
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
  margin-top: 4px;
  font-size: 0.8rem;
  color: var(--color-error);
}
</style>
