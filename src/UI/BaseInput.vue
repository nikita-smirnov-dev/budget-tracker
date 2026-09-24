<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isChecked?: boolean;
    placeholder?: string;
    type?: string;
    value?: string;
    name?: string;
    inputClass?: string;
    variantAction?: 'base-input' | 'radio';
  }>(),
  {
    isChecked: false,
    inputClass: '',
    variantAction: 'base-input',
  },
);
</script>

<template>
  <label>
    <input
      :class="[
        'input-reset',
        inputClass,
        { 'base-input': variantAction === 'base-input' },
        { 'input--radio': variantAction === 'radio' },
      ]"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :name="name"
      :checked="isChecked"
    />
    <slot></slot>
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
</style>
