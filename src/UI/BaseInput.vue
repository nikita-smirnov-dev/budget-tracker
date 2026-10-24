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
  box-shadow: var(--input-border);
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: var(--surface-color);
}

.base-input::placeholder {
  color: var(--secondary-text-color);
}

.base-input:focus {
  box-shadow: inset 0 0 0 2px var(--accent-color);
}

.input-error .base-input {
  box-shadow: inset 0 0 0 2px var(--color-error);
}

.input-error .base-input:focus {
  box-shadow: inset 0 0 0 2px var(--color-error);
}

.error-text {
  display: block;
  position: absolute;
  margin-top: 4px;
  font-size: 0.8rem;
  color: var(--color-error);
}
</style>
