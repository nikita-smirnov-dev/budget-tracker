<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isChecked?: boolean;
    value?: string;
    name?: string;
    variantAction?: 'base-radio' | 'base-filter';
    modelValue?: string | number | null;
  }>(),
  {
    isChecked: false,
    modelValue: '',
    variantAction: 'base-radio',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();
</script>

<template>
  <label
    :class="[
      { 'base-radio--checked': modelValue === value },
      {
        'base-radio': variantAction === 'base-radio',
      },
      { 'base-filter': variantAction === 'base-filter' },
    ]"
  >
    <input
      class="input-reset hidden-radio"
      type="radio"
      :value="value"
      :name="name"
      :checked="modelValue === value"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <slot></slot>
  </label>
</template>

<style scoped>
.hidden-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.base-radio {
  padding: 5px;
  width: 100%;
  text-align: center;
  background: transparent;
  cursor: pointer;
  color: var(--secondary-text-color);
  transition: color 0.3s ease-in-out;
}

.base-radio:not(:last-child) {
  border-right: 1px solid var(--card-bg-color);
}

.base-radio:has(input[type='radio']:focus-visible) {
  box-shadow: 0 0 0 2px var(--accent-color);
}

.base-radio:not(:has(input[type='radio']:checked)):hover {
  color: #f3f4f6;
}

.base-radio:has(input[type='radio']:checked) {
  color: #f3f4f6;
  background: var(--main-color);
  transition: background 0.3s ease-in-out;
}

.base-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  color: var(--secondary-text-color);
  transition:
    color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

.base-filter:has(input[type='radio']:focus-visible) {
  box-shadow: 0 0 0 2px var(--accent-color);
}

.base-filter:not(:has(input[type='radio']:checked)):hover {
  color: #f3f4f6;
}

.base-filter input[type='radio'] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.base-filter:has(input[type='radio']:checked) {
  color: #f3f4f6;
  background: var(--main-color);
  transition: background 0.3s ease-in-out;
}
</style>
