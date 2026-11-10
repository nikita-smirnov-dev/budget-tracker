<script setup lang="ts">
import { useField } from 'vee-validate';

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

const {
  value: fieldValue,
  errorMessage,
  handleChange,
} = useField(() => props.name || '', undefined, {
  initialValue: props.modelValue ?? '',
  syncVModel: props.name ? false : true,
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (props.name) {
    handleChange(target.value);
  } else {
    emit('update:modelValue', target.value);
  }
};
</script>

<template>
  <label>
    <div :class="{ 'input-error': errorMessage }">
      <input
        :class="['input-reset', inputClass, 'base-input']"
        :type="type"
        :step="step"
        :placeholder="placeholder"
        :value="props.name ? fieldValue : modelValue"
        :name="name"
        @input="onInput"
      />
      <slot></slot>
    </div>
    <span v-if="errorMessage || isError" class="error-text">{{
      errorMessage || isError
    }}</span>
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
